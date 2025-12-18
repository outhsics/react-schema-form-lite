

/**
 * 字段依赖配置
 */
export interface Dependency {
    /** 依赖的字段名 */
    field: string;
    /** 触发条件的值 */
    value: any;
    /** 操作符 (暂支持相等) */
    operator?: 'eq';
}

/**
 * 字段校验规则
 * 继承自 react-hook-form 的 RegisterOptions
 */
export interface FieldRules {
    required?: string | boolean;
    pattern?: {
        value: RegExp;
        message: string;
    };
    min?: {
        value: number;
        message: string;
    };
    max?: {
        value: number;
        message: string;
    };
}

/**
 * 核心：字段 Schema 定义
 */
export interface FieldSchema {
    /** 字段唯一标识 (也是表单数据的 key) */
    name: string;

    /** 组件类型 (对应 Registry 中的 key) */
    type: string;

    /** 字段标签 */
    label?: string;

    /** 默认值 */
    defaultValue?: any;

    /** 透传给组件的 Props (如 placeholder, disabled 等) */
    props?: Record<string, any>;

    /** 校验规则 */
    rules?: FieldRules;

    /** 联动依赖 */
    dependencies?: Dependency[];

    /** 子节点 (用于 group 或 component 本身支持 children) */
    children?: FieldSchema[];
}

/**
 * 注册组件接收的标准 Props
 */
export interface WidgetProps {
    /** 当前字段的值 */
    value?: any;
    /** 值变更回调 */
    onChange?: (value: any) => void;
    /** 字段 Schema */
    schema: FieldSchema;
    /** 是否禁用 */
    disabled?: boolean;
    /** 错误信息 */
    error?: any;
    /** 透传的组件属性 */
    props?: any;
}
