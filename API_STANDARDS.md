# 后端接口数据标准 (API Standards)

本文档定义了后端下发给前端 `React Schema Form Lite` 引擎的 JSON 数据结构标准。

## 1. 核心数据结构

后端返回的数据应为一个对象数组，每个对象代表一个表单字段或布局块。

```typescript
type FormSchema = FieldSchema[];
```

### FieldSchema 定义

```typescript
interface FieldSchema {
  /** 字段唯一标识，对应表单提交时的 key */
  name: string;
  
  /** 字段类型，对应组件注册表中的 key */
  type: 'input' | 'select' | 'number' | 'switch' | 'group' | string;
  
  /** 字段标签，显示在表单项左侧 */
  label?: string;
  
  /** 默认值 */
  defaultValue?: any;
  
  /** 组件级属性 (透传给具体 UI 组件的 props) */
  props?: {
    placeholder?: string;
    options?: Array<{ label: string; value: string | number }>; // 针对 select/radio
    disabled?: boolean;
    [key: string]: any;
  };

  /** 校验规则 */
  rules?: {
    required?: boolean;         // 是否必填
    message?: string;           // 错误提示文案
    pattern?: string;           // 正则表达式字符串
    min?: number;               // 最小值/最小长度
    max?: number;               // 最大值/最大长度
  };

  /** 联动依赖配置 */
  dependencies?: {
    /** 依赖的字段 name */
    field: string;
    /** 触发条件：当依赖字段的值等于该值时，当前字段才显示 */
    value: any | any[]; 
    /** (可选) 复杂的逻辑操作符，暂定只支持 'eq' (等于) */
    operator?: 'eq' | 'in'; 
  }[];

  /** 子字段 (仅当 type 为 'group' 或 'list' 时有效) */
  children?: FieldSchema[];
}
```

## 2. 示例 JSON 响应

后端接口 `/api/v1/form-config` 示例响应：

```json
[
  {
    "type": "group",
    "name": "basic_info",
    "label": "基本信息",
    "children": [
      {
        "type": "input",
        "name": "username",
        "label": "用户名",
        "rules": { "required": true, "message": "请输入用户名" },
        "props": { "placeholder": "请输入您的账户名" }
      },
      {
        "type": "number",
        "name": "age",
        "label": "年龄",
        "props": { "min": 0, "max": 120 }
      }
    ]
  },
  {
    "type": "select",
    "name": "role",
    "label": "角色选择",
    "props": {
      "options": [
        { "label": "开发者", "value": "dev" },
        { "label": "设计师", "value": "design" },
        { "label": "产品经理", "value": "pm" }
      ]
    }
  },
  {
    "type": "input",
    "name": "github_url",
    "label": "GitHub 主页",
    "dependencies": [
      {
        "field": "role",
        "value": "dev"
      }
    ],
    "props": {
      "placeholder": "https://github.com/..."
    }
  }
]
```
