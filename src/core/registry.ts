import React from 'react';
import type { WidgetProps } from './types';

// 定义 Widget 组件类型
export type WidgetComponent = React.ComponentType<WidgetProps>;

class ComponentRegistry {
    private components: Map<string, WidgetComponent> = new Map();

    /**
     * 注册一个新的组件
     * @param type 组件类型名称 (如 'input', 'select')
     * @param component React 组件
     */
    register(type: string, component: WidgetComponent) {
        if (this.components.has(type)) {
            console.warn(`[SchemaForm] Component type "${type}" is already registered! It will be overwritten.`);
        }
        this.components.set(type, component);
    }

    /**
     * 获取已注册的组件
     * @param type 组件类型名称
     */
    get(type: string): WidgetComponent | undefined {
        return this.components.get(type);
    }

    /**
     * 获取所有已注册的组件类型
     */
    getTypes(): string[] {
        return Array.from(this.components.keys());
    }
}

// 导出单例
export const registry = new ComponentRegistry();
export default registry;
