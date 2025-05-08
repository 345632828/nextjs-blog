"use client";

import { useRef, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Form } from "antd";
import componentsList from "./formComponents";
import renderComponents from "@/components/josnToForm";
//import { ComponentItem, useComponentStore } from "@/store/useComponentStore";
//import { ComponentItem, useComponentStore } from "@/store/useComponentStore";
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
const ItemType = "FORM_COMPONENT";
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

// 中间：单个表单组件
const FormComponent = ({ comp, idx, moveComponent, onDoubleClick }: any) => {
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
  const onDoubleClickEdit = () => {
    console.log("componentsList", componentsList);
    console.log("idx", idx);
    updateListItemInPlace(componentsList, "radio", "A", { label: "香蕉" });
    onDoubleClick(idx);
  };
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

export default FormComponent