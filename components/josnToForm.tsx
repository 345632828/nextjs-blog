import {
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Card,
  message,
  Radio,
  Checkbox,
  Cascader,
  Rate,
} from "antd";
const renderComponent = (comp: any) => {
  // console.log('comp',comp)
  switch (comp.type) {
    case "input":
      return <Input placeholder={comp.placeholder} />;
    case "select":
      return (
        <Select placeholder={comp.placeholder}>
          <Select.Option value="1">选项1</Select.Option>
          <Select.Option value="2">选项2</Select.Option>
        </Select>
      );
    case "date":
      return <DatePicker />;
    case "radio":
      return (
        <Radio.Group>
          {(
            comp.list || [
              { label: "选项A", value: "A" },
              { label: "选项B", value: "B" },
            ]
          ).map((opt: any) => (
            <Radio key={opt.value} value={opt.value}>
              {opt.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case "cascader":
      let options = [];
      if(comp.list){
        options=comp.list
      }
      const onChange = (value:any) => {
        console.log(value);
      };
      return (
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Please select"
        />
      );
    case "checked":
      let optionsChecked = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
      ];
      if(comp.list){
        optionsChecked=comp.list
      }
      const onChangeChecked = (value:any) => {
        console.log(value);
      };
      return (<Checkbox.Group options={optionsChecked} defaultValue={[]} onChange={onChangeChecked} />);
    case "rate":
      return <Rate allowHalf defaultValue={comp.value||5} />;
    // case "checked":
    //   return <DatePicker />;
    default:
      return null;
  }
};

export default renderComponent;
