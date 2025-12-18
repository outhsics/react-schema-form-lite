import React, { useState, useMemo } from 'react';
import { SchemaForm } from './core/SchemaForm';
import { registerWidgets } from './components/widgets';
import { ConfigProvider, Card, Alert, Button, message } from 'antd';
import { FieldSchema } from './core/types';

// 注册所有组件
registerWidgets();

// 默认复杂配置案例
const DEFAULT_SCHEMA: FieldSchema[] = [
  {
    type: 'group',
    name: 'basic_info',
    label: '👤 基本信息',
    children: [
      {
        type: 'input',
        name: 'fullName',
        label: '姓名',
        rules: { required: '姓名是必填项' },
        props: { placeholder: '请输入真实姓名' }
      },
      {
        type: 'number',
        name: 'age',
        label: '年龄',
        props: { min: 0, max: 120 }
      },
      {
        type: 'radio',
        name: 'gender',
        label: '性别',
        defaultValue: 'male',
        props: {
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
            { label: '其他', value: 'other' }
          ]
        }
      }
    ]
  },
  {
    type: 'group',
    name: 'advanced_setup',
    label: '⚙️ 进阶配置 (联动演示)',
    children: [
      {
        type: 'switch',
        name: 'hasPet',
        label: '是否拥有宠物?',
        defaultValue: false
      },
      {
        type: 'select',
        name: 'petType',
        label: '宠物类型',
        dependencies: [
          { field: 'hasPet', value: true }
        ],
        rules: { required: '请选择宠物类型' },
        props: {
          placeholder: '请选择...',
          options: [
            { label: '猫 🐱', value: 'cat' },
            { label: '狗 🐶', value: 'dog' },
            { label: '仓鼠 🐹', value: 'hamster' }
          ]
        }
      },
      {
        type: 'input',
        name: 'petName',
        label: '宠物昵称',
        dependencies: [
          { field: 'hasPet', value: true }
        ],
        props: { placeholder: '给它起个名字吧' }
      }
    ]
  }
];

function App() {
  const [jsonStr, setJsonStr] = useState(JSON.stringify(DEFAULT_SCHEMA, null, 2));
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 解析 JSON
  const schema = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonStr);
      setError(null);
      return parsed;
    } catch (e: any) {
      setError(e.message);
      return [];
    }
  }, [jsonStr]);

  const handleFinish = (data: any) => {
    console.log('Form Submitted:', data);
    setFormData(data);
    message.success('表单提交成功！请查看下方结果');
  };

  return (
    <ConfigProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              🚀 React Schema Form Lite
              <span className="text-xs font-normal px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">v1.0.0</span>
            </h1>
            <div className="flex gap-2">
              <Button
                type="default"
                onClick={() => {
                  window.open('https://github.com', '_blank'); // Placeholder
                }}
              >
                GitHub
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-80px)]">

          {/* Left: Editor */}
          <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-600 text-sm">Schema Editor (JSON)</span>
              {error && <span className="text-red-500 text-xs truncate max-w-[200px]">{error}</span>}
            </div>
            <textarea
              className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none text-gray-800"
              style={{ backgroundColor: '#fff' }}
              value={jsonStr}
              onChange={(e) => setJsonStr(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Right: Preview */}
          <div className="flex flex-col h-full gap-4 overflow-hidden">
            <div className="flex-1 bg-white rounded-lg shadow-sm p-6 overflow-y-auto border border-gray-200">
              <div className="mb-6 border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-600 text-sm uppercase tracking-wider">Form Preview</span>
              </div>

              {error ? (
                <Alert message="JSON 格式错误，无法渲染表单" type="error" showIcon />
              ) : (
                <SchemaForm
                  schema={schema}
                  onSubmit={handleFinish}
                />
              )}
            </div>

            {/* Submit Result Console */}
            <div className="h-32 bg-gray-900 rounded-lg shadow-sm p-4 overflow-auto text-xs font-mono border border-gray-800">
              <div className="text-gray-400 mb-2 border-b border-gray-700 pb-1 flex justify-between">
                <span>Form State Logger</span>
                {formData && <span className="text-green-400">Received Update</span>}
              </div>
              <pre className="text-green-300">
                {formData ? JSON.stringify(formData, null, 2) : '// 等待提交...'}
              </pre>
            </div>
          </div>

        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;
