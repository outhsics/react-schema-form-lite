import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldSchema } from './types';
import registry from './registry';
import { useDependency } from './hooks/useDependency';

interface SchemaItemProps {
    schema: FieldSchema;
}

export const SchemaItem: React.FC<SchemaItemProps> = ({ schema }) => {
    const { control, formState: { errors } } = useFormContext();
    const isVisible = useDependency(schema);

    // 1. 处理显隐逻辑
    if (!isVisible) {
        return null;
    }

    // 2. 处理容器类型 (Group)
    if (schema.type === 'group') {
        return (
            <div className="border border-gray-200 p-4 rounded-md mb-4 bg-gray-50">
                {schema.label && <h3 className="font-bold mb-3 text-lg text-gray-700 border-b pb-2">{schema.label}</h3>}
                <div className="grid grid-cols-1 gap-4">
                    {schema.children?.map((child) => (
                        <SchemaItem key={child.name} schema={child} />
                    ))}
                </div>
            </div>
        );
    }

    // 3. 获取注册的组件
    const Component = registry.get(schema.type);
    if (!Component) {
        return (
            <div className="text-red-500 p-2 border border-red-300 rounded bg-red-50 text-sm">
                ⚠️ 未知组件类型: <strong>{schema.type}</strong> (字段: {schema.name})
            </div>
        );
    }

    // 4. 渲染表单项
    return (
        <Controller
            name={schema.name}
            control={control}
            rules={schema.rules}
            defaultValue={schema.defaultValue}
            render={({ field }) => (
                <div className="mb-4">
                    {schema.label && (
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {schema.label}
                            {schema.rules?.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}

                    <Component
                        {...field}
                        schema={schema}
                        disabled={schema.props?.disabled}
                        error={errors[schema.name]}
                        // 透传 props
                        props={schema.props}
                    />

                    {/* 错误提示 */}
                    {errors[schema.name] && (
                        <p className="mt-1 text-sm text-red-600">
                            {String(errors[schema.name]?.message || '输入有误')}
                        </p>
                    )}
                </div>
            )}
        />
    );
};
