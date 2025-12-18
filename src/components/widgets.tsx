import React from 'react';
import { Input, Select, InputNumber, Switch, Radio, Checkbox } from 'antd';
import { WidgetProps } from '../core/types';
import registry from '../core/registry';

// --- 组件实现 ---

export const InputWidget: React.FC<WidgetProps> = ({ value, onChange, schema, disabled, props }) => {
    return (
        <Input
            value={value}
            onChange={e => onChange?.(e.target.value)}
            disabled={disabled}
            placeholder={props?.placeholder}
            {...props}
        />
    );
};

export const SelectWidget: React.FC<WidgetProps> = ({ value, onChange, schema, disabled, props }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            disabled={disabled}
            options={props?.options} // 假设 options 在 props 里
            placeholder={props?.placeholder}
            style={{ width: '100%' }}
            {...props}
        />
    );
};

export const NumberWidget: React.FC<WidgetProps> = ({ value, onChange, schema, disabled, props }) => {
    return (
        <InputNumber
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{ width: '100%' }}
            {...props}
        />
    );
};

export const SwitchWidget: React.FC<WidgetProps> = ({ value, onChange, schema, disabled, props }) => {
    return (
        <Switch
            checked={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
        />
    );
};

export const RadioWidget: React.FC<WidgetProps> = ({ value, onChange, schema, disabled, props }) => {
    return (
        <Radio.Group
            value={value}
            onChange={e => onChange?.(e.target.value)}
            disabled={disabled}
            {...props}
        >
            {props?.options?.map((opt: any) => (
                <Radio key={opt.value} value={opt.value}>{opt.label}</Radio>
            ))}
        </Radio.Group>
    )
}


// --- 自动注册 ---

export function registerWidgets() {
    registry.register('input', InputWidget);
    registry.register('select', SelectWidget);
    registry.register('number', NumberWidget);
    registry.register('switch', SwitchWidget);
    registry.register('radio', RadioWidget);
    // group 是内置逻辑，不需要注册组件，但在 types check 中会用到
}
