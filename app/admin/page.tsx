'use client';

import { useRef, useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Form, Card, message, Radio,  } from 'antd';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import renderComponents from "@/components/josnToForm";
import componentsList from './formComponents';
import FormComponent from './formEdit'
import useUserStore from "@/app/store/store";
import FormEditor  from "./formEditCard"; 

const ItemType = 'FORM_COMPONENT';
// 定义表单项的类型
interface FormItem {
  type: string;
  label: string;
  options?: { label: string; value: string }[];
  list?: { label: string; value: string }[];
  placeholder: string;
  [key: string]: any; 
}

// 转换函数
function convertDateToPickerView(data: FormItem[]): FormItem[] {
  return data.map((item: FormItem): FormItem => {
    if (item.type === 'date') {
      return {
        ...item,
        type: 'picker-view',
      };
    }
    return { ...item }; 
  });
}

type Option = {
  label: string;
  value: string;
  children?: Option[];
};

type ComponentItem = {
  type: string;
  label: string;
  list?: Option[];
  value?: any;
};

function updateListItemInPlace(
  components: ComponentItem[],
  targetType: string,
  targetValue: string,
  newItem: Partial<Option>
): void {
  for (const item of components) {
    if (item.type === targetType && Array.isArray(item.list)) {
      for (const subItem of item.list) {
        if (subItem.value === targetValue) {
          Object.assign(subItem, newItem);
        }
      }
    }
  }
}


// 左侧：组件项
const ComponentItem = ({ type, label, onBeforeDrag }: any) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  return (
    <Button
      ref={ref}
      block
      style={{ marginBottom: 10, opacity: isDragging ? 0.5 : 1 }}
      onMouseDown={() => onBeforeDrag?.()}
    >
      {label}
    </Button>
  );
};

// 中间：单个表单组件
const FormComponentOld = ({ comp, idx, moveComponent, onDoubleClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);

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
    item: { type: comp.type, index: idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(drop(ref.current));
    }
  }, [ref, drag, drop]);
  const onDoubleClickEdit = ()=>{
    console.log('componentsList',componentsList)
    console.log('idx',idx)
    updateListItemInPlace(componentsList, "radio", "A", { label: "香蕉" });
    onDoubleClick(idx)
  }
  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={onDoubleClickEdit}
    >
      <Form.Item label={comp.label}>{renderComponents(comp)}</Form.Item>
    </div>
  );
};

// 中间：可视区容器，支持拖入新组件
const DropZone = ({ children, onAdd }: any) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        if (item.index === undefined) {
          onAdd(item.type);
        }
      }
      item.index = undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop, dropRef]);

  return (
    <div
      ref={dropRef}
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
  const [dragKey, setDragKey] = useState(0);
  const sTname = useUserStore((state) => state.name);

  const addComponent = (type: string) => {
    console.log('type',type)
    console.log('formComponents',formComponents)
    const uniqueId = `comp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const config = componentsList.find((c) => c.type === type);
    const newComponent = {
      uniqueId,
      type,
      label: '未命名',
      placeholder: '',
      list: config?.list || [],
      value:config?.value || 0,
    };
    setFormComponents([...formComponents, newComponent]);
  };

  const moveComponent = (fromIndex: number, toIndex: number) => {
    const updated = [...formComponents];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormComponents(updated);
  };

  // 更新可视区表单
  const updateSelected = (field: string, value: string) => {
    if (selectedIndex === null) return;
    const updated = [...formComponents];
    updated[selectedIndex][field] = value;
    setFormComponents(updated);
  };

  const saveForm = () => {
    message.success('表单已保存');
    console.log('保存表单数据：', JSON.stringify(formComponents, null, 2));
  };

  const exportForm = () => {
    const json = JSON.stringify(convertDateToPickerView(formComponents), null, 2);
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
              key={`${item.type}-${dragKey}-${index}`}
              type={item.type}
              label={item.label}
              onBeforeDrag={() => setDragKey((prev) => prev + 1)}
            />
          ))}
        </Card>

        {/* 中间可视区 */}
        <Card  style={{ flex: 1 }}
           title={
          <div className="flex justify-between items-center">
            <span>可视区</span>
            <div className="pl-4 space-x-2">
              <Button type="primary" onClick={saveForm}>
                保存表单{sTname}
              </Button>
              <Button onClick={exportForm}>导出为 JSON</Button>
            </div>
          </div>
        }
        >
      
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
        <Card title="编辑区" style={{ width: 300 }} >
          {selectedIndex !== null ? (
            <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
              <FormEditor
                formComponents={formComponents}
                selectedIndex={selectedIndex}
                updateSelected={updateSelected}
              />
            </div>
          ) : (
            <p>请双击中间区域组件进行编辑</p>
            
          )}
        </Card>
      </div>

    
    </DndProvider>
  );
}
