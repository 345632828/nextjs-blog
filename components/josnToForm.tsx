import { Input, Select, DatePicker, Button, Form, Card, message, Radio,  } from 'antd';
const renderComponent = (comp: any) => {
    // console.log('comp',comp)
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
        case 'radio':
          return (
            <Radio.Group>
              {(comp.list || [
                { label: '选项A', value: 'A' },
                { label: '选项B', value: 'B' },
              ]).map((opt: any) => (
                <Radio key={opt.value} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          );
      default:
        return null;
    }
  };

  export default renderComponent;