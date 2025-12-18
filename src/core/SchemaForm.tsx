import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { FieldSchema } from './types';
import { SchemaItem } from './SchemaItem';

interface SchemaFormProps {
    schema: FieldSchema[];
    onSubmit: (data: any) => void;
    defaultValues?: any;
    className?: string;
}

export const SchemaForm: React.FC<SchemaFormProps> = ({
    schema,
    onSubmit,
    defaultValues,
    className = ""
}) => {
    const methods = useForm({
        defaultValues: defaultValues || {},
        mode: 'onChange' // 实时校验
    });

    // 当外部默认值更新时，重置表单
    useEffect(() => {
        if (defaultValues) {
            methods.reset(defaultValues);
        }
    }, [defaultValues, methods]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
                {schema.map((field) => (
                    <SchemaItem key={field.name} schema={field} />
                ))}

                {/* 默认提交按钮，实际项目中可能由外部控制 */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 font-medium shadow-sm"
                    >
                        提交表单
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};
