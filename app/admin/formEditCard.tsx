import React from "react";
import { Input } from "antd";

type FormComponentItem = {
  label: string;
  placeholder?: string;
  [key: string]: any;
};

interface FormEditorProps {
  formComponents: FormComponentItem[];
  selectedIndex: number;
  updateSelected: (field: string, value: any) => void;
}

const FormEditor: React.FC<FormEditorProps> = ({
  formComponents,
  selectedIndex,
  updateSelected,
}) => {
  if (
    !Array.isArray(formComponents) ||
    selectedIndex < 0 ||
    selectedIndex >= formComponents.length
  ) {
    return <div style={{ color: "red" }}>请选择一个有效的组件</div>;
  }

  const selected = formComponents[selectedIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Input
        placeholder="标签名"
        value={selected.label}
        onChange={(e) => updateSelected("label", e.target.value)}
      />
      <Input
        placeholder="占位提示"
        value={selected.placeholder || ""}
        onChange={(e) => updateSelected("placeholder", e.target.value)}
      />
    </div>
  );
};

export default FormEditor;