import React from "react";
import { useRef, useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Form, Card, message, Radio, } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import JsonEditor from "@/components/JsonEditor";
import { useAlignmentStore }  from "../store/useAlignmentStore";

const options: CheckboxGroupProps<string>['options'] = [
    { label: '左', value: 'left' },
    { label: '右', value: 'right' },
    { label: '居中', value: 'middle' },
    
];

const optionsSize: CheckboxGroupProps<string>['options'] = [  
    { label: '小', value: 'small' },
    { label: '大', value: 'large' },
    { label: '默认', value: 'middle' },
];

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

    const [json, setJson] = useState({
        type: "input",
        label: "输入框",
        placeholder: "请输入内容",
    });
    
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
            <Radio.Group block options={options} defaultValue="left"  />
            <Radio.Group block options={optionsSize} defaultValue="middle" />
            <div style={{ padding: 40 }}>
                <JsonEditor value={json} onChange={(val) => setJson(val)} />
                <div style={{ marginTop: 24 }}>
                    <pre>{JSON.stringify(json, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default FormEditor;