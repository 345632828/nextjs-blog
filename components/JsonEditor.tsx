// components/JsonEditor.tsx
import React, { useState, useEffect } from "react";
import { Input, Typography, Alert, Button, message } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

interface JsonEditorProps<T = any> {
  value: T;
  onChange: (val: T) => void;
  height?: number;
}

const JsonEditor = <T,>({ value, onChange, height = 200 }: JsonEditorProps<T>) => {
  const [text, setText] = useState<string>(JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  // 校验 JSON 格式的方法
  const handleChange = (val: string) => {
    setText(val);

    try {
      const parsed = JSON.parse(val);
      onChange(parsed); // 只有在正确的 JSON 格式下更新父组件
      setError(null); // 清除错误提示
    } catch (err: any) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleSave = () => {
    // 尝试保存 JSON
    try {
      const parsed = JSON.parse(text);
      onChange(parsed); // 更新父组件的状态
      setError(null); // 清除错误提示

      // 显示成功提示
      message.success("保存成功！");
    } catch (err: any) {
      setError("Invalid JSON format. Please check your input.");
      // 显示错误提示
      message.error("保存失败！无效的 JSON 格式");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text strong>JSON 编辑器</Text>
      <TextArea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        autoSize={{ minRows: 8, maxRows: 20 }}
        style={{ fontFamily: "monospace", height }}
      />
      {error && <Alert message="JSON 格式错误" description={error} type="error" />}
      <Button
        type="primary"
        onClick={handleSave}
        disabled={!!error}
        style={{ marginTop: 10 }}
      >
        保存
      </Button>
    </div>
  );
};

export default JsonEditor;
