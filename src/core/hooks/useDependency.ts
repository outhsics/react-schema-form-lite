import { useWatch, useFormContext } from 'react-hook-form';
import { FieldSchema } from '../types';

/**
 * 联动 Hook：判断字段是否应该显示
 * @param schema 当前字段的定义
 * @returns {boolean} 是否可见 (true 为显示, false 为隐藏)
 */
export function useDependency(schema: FieldSchema): boolean {
    const { control } = useFormContext();

    // 如果没有依赖，默认显示
    if (!schema.dependencies || schema.dependencies.length === 0) {
        return true;
    }

    // 监听所有依赖相关字段的变化
    // 暂时只支持 AND 逻辑：所有依赖条件都满足才显示
    // TODO: 后期可扩展支持 OR 逻辑

    // 我们需要针对每个依赖项分别 useWatch，或者一次性 watch 所有表单数据(性能稍差但开发简单)。
    // 为了性能，我们构建一个依赖字段名的数组进行监听
    const dependencyNames = schema.dependencies.map(d => d.field);
    const values = useWatch({
        control,
        name: dependencyNames,
    });

    // values 是一个数组，顺序对应 dependencyNames
    // 检查每个依赖条件
    const isVisible = schema.dependencies.every((dep, index) => {
        const currentValue = values[index];
        const targetValue = dep.value;

        if (dep.operator === 'eq' || !dep.operator) {
            return currentValue === targetValue;
        }

        // 扩展其他操作符
        return false;
    });

    return isVisible;
}
