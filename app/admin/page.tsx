'use client';

import { useState } from 'react';
import { Input, Select, DatePicker, Button, Form, Card, message } from 'antd';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const componentsList = [
  { type: 'input', label: '输入框' },
  { type: 'select', label: '下拉框' },
  { type: 'date', label: '日期选择' },
];

const ItemType = 'FORM_COMPONENT';

// 左侧：组件项
const ComponentItem = ({ type, label, onBeforeDrag }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { type }, // 这里是设置拖动的项
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Button
      ref={drag}
      block
      style={{ marginBottom: 10, opacity: isDragging ? 0.5 : 1 }}
      onMouseDown={() => onBeforeDrag?.()} // 确保拖动开始前进行重置
    >
      {label}
    </Button>
  );
};

// 中间：单个表单组件
const FormComponent = ({ comp, idx, moveComponent, onDoubleClick }: any) => {
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: any) => {
      if (item.index !== undefined && item.index !== idx) {
        moveComponent(item.index, idx);
        item.index = idx;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { type: comp.type, index: idx }, // 绑定组件的索引
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderComponent = (comp: any) => {
    switch (comp.type) {
      case 'input':
        return <Input placeholder={comp.placeholder} />;
      case 'select':
        return (
          <Select placeholder={comp.placeholder}>
            <Select.Option value="1">选项1</Select.Option>
            <Select.Option value="2">选项2</Select.Option>
          </Select>
        );
      case 'date':
        return <DatePicker />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => onDoubleClick(idx)}
    >
      <Form.Item label={comp.label}>{renderComponent(comp)}</Form.Item>
    </div>
  );
};

// 中间：可视区容器，支持拖入新组件
const DropZone = ({ children, onAdd }: any) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        if (item.index === undefined) {
          onAdd(item.type);
        }
      }
      // 重置拖拽项状态，保证每次可以继续拖动
      item.index = undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        minHeight: 200,
        padding: 10,
        border: '2px dashed #ddd',
        backgroundColor: isOver ? '#e6f7ff' : 'transparent',
        transition: 'background-color 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};

// 主页面
export default function Index() {
  const [formComponents, setFormComponents] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragKey, setDragKey] = useState(0); // 👈 用于强制更新组件区状态

  // 添加新组件
  const addComponent = (type: string) => {
    const newComponent = {
      type,
      label: '未命名',
      placeholder: '',
    };
    setFormComponents([...formComponents, newComponent]);
  };

  // 移动组件
  const moveComponent = (fromIndex: number, toIndex: number) => {
    const updated = [...formComponents];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormComponents(updated);
  };

  // 更新选中的组件属性
  const updateSelected = (field: string, value: string) => {
    if (selectedIndex === null) return;
    const updated = [...formComponents];
    updated[selectedIndex][field] = value;
    setFormComponents(updated);
  };

  // 保存表单数据
  const saveForm = () => {
    message.success('表单已保存');
    console.log('保存表单数据：', JSON.stringify(formComponents, null, 2));
  };

  // 导出表单数据为 JSON
  const exportForm = () => {
    const json = JSON.stringify(formComponents, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-config.json';
    link.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', padding: 20, gap: 20 }}>
        {/* 左侧组件区 */}
        <Card title="组件区" style={{ width: 200 }}>
          {componentsList.map((item, index) => (
            <ComponentItem
              key={`${item.type}-${dragKey}-${index}`} // 👈 确保唯一 key 强制更新
              type={item.type}
              label={item.label}
              onBeforeDrag={() => {
                // 重置 dragKey，强制刷新组件，重置拖拽状态
                setDragKey((prev) => prev + 1);
              }}
            />
          ))}
        </Card>

        {/* 中间可视区 */}
        <Card title="可视区" style={{ flex: 1 }}>
          <DropZone onAdd={addComponent}>
            <Form layout="vertical">
              {formComponents.map((comp, idx) => (
                <FormComponent
                  key={idx}
                  comp={comp}
                  idx={idx}
                  moveComponent={moveComponent}
                  onDoubleClick={setSelectedIndex}
                />
              ))}
            </Form>
          </DropZone>
        </Card>

        {/* 右侧编辑区 */}
        <Card title="编辑区" style={{ width: 300 }}>
          {selectedIndex !== null ? (
            <>
              <Input
                placeholder="标签名"
                style={{ marginBottom: 10 }}
                value={formComponents[selectedIndex].label}
                onChange={(e) => updateSelected('label', e.target.value)}
              />
              <Input
                placeholder="占位提示"
                value={formComponents[selectedIndex].placeholder}
                onChange={(e) => updateSelected('placeholder', e.target.value)}
              />
            </>
          ) : (
            <p>请双击中间区域组件进行编辑</p>
          )}
        </Card>
      </div>

      <div style={{ paddingLeft: 20 }}>
        <Button type="primary" onClick={saveForm} style={{ marginRight: 10 }}>
          保存表单
        </Button>
        <Button onClick={exportForm}>导出为 JSON</Button>
      </div>
    </DndProvider>
  );
}
