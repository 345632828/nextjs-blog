export default [
  { type: "input", label: "输入框" },
  { type: "select", label: "下拉框" },
  { type: "date", label: "日期选择" },
  {
    type: "radio",
    label: "单选框",
    list: [
      { label: "苹果", value: "A" },
      { label: "西瓜", value: "B" },
    ],
  },
  {
    type: "checked",
    label: "复选框",
    list: [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
      { label: "选项三", value: "3" },
    ],
  },
  {
    type: "cascader",
    label: "联动选择框",
    list: [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men",
              },
            ],
          },
        ],
      },
    ],
  },
  //   { type: "password", label: "密码框" },
  //   { type: "textarea", label: "多行文本框" },
  //   { type: "number", label: "数字输入框" },
  //   { type: "multipleSelect", label: "多选下拉" },
  //   { type: "date", label: "日期选择" },
  //   { type: "rangePicker", label: "日期范围" },
  //   { type: "time", label: "时间选择" },
  //   { type: "switch", label: "开关" },

  //   { type: "slider", label: "滑块" },
  //   { type: "rate", label: "评分" },
  //   { type: "upload", label: "上传文件" },
  //   { type: "treeSelect", label: "树选择" },
  //   { type: "colorPicker", label: "颜色选择器" },
  //   { type: "segmented", label: "分段控制" },
  //   { type: "text", label: "静态文本" },
  //   { type: "divider", label: "分割线" },
  //   { type: "button", label: "按钮" },
];
