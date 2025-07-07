# Build Your Own React 18

从头实现一个简易的 React 18，深入理解 React 的核心原理和 Fiber 架构。

## 🎯 项目目标

- 理解 React 18 的 Fiber 架构
- 掌握 JSX 转换和虚拟 DOM 概念
- 实现基础的 Hooks 系统 (useState, useEffect, useReducer)
- 了解 React 的调度器和时间切片
- 实现简单的事件系统和 DOM 操作

## 📁 项目结构

```
src/
├── react/                 # React 核心实现
│   ├── jsx/               # JSX 处理
│   │   ├── createElement.ts
│   │   └── Fragment.ts
│   ├── hooks/             # Hooks 系统
│   │   ├── index.ts
│   │   ├── useState.ts
│   │   ├── useEffect.ts
│   │   └── useReducer.ts
│   ├── reconciler/        # 协调器
│   │   ├── index.ts
│   │   ├── fiber.ts
│   │   └── diff.ts
│   ├── scheduler/         # 调度器
│   │   ├── index.ts
│   │   ├── workLoop.ts
│   │   └── priority.ts
│   └── index.ts
├── react-dom/             # ReactDOM 实现
│   ├── client/            # 客户端渲染
│   │   ├── createRoot.ts
│   │   └── render.ts
│   ├── events/            # 事件系统
│   │   ├── index.ts
│   │   ├── SyntheticEvent.ts
│   │   └── EventListener.ts
│   └── index.ts
├── shared/                # 共享工具和类型
│   ├── types.ts
│   └── utils.ts
└── examples/              # 示例和测试
    ├── App.tsx
    ├── Counter.tsx
    ├── TodoList.tsx
    └── EffectExample.tsx
```

## 🏗️ 核心架构

### 1. JSX 处理层

- **createElement**: 将 JSX 转换为 React Element
- **Fragment**: 支持多个子元素的容器

### 2. Fiber 架构

- **Fiber 节点**: React 18 的核心数据结构
- **双缓存**: current 树和 workInProgress 树
- **链表结构**: child、sibling、parent 指针

### 3. 调度器 (Scheduler)

- **时间切片**: 将渲染工作分解为小任务
- **优先级**: 不同更新的优先级管理
- **可中断渲染**: 支持高优先级任务插队

### 4. 协调器 (Reconciler)

- **Diff 算法**: 比较新旧虚拟 DOM 树
- **Effect 标记**: 标记需要的 DOM 操作
- **提交阶段**: 将变更应用到真实 DOM

### 5. Hooks 系统

- **useState**: 状态管理
- **useEffect**: 副作用处理
- **useReducer**: 复杂状态管理

### 6. 事件系统

- **事件代理**: 在根节点统一处理事件
- **合成事件**: 跨浏览器兼容的事件对象

## 🚀 实现步骤

### 阶段 1: JSX 和基础渲染

1. 实现 `createElement` 函数
2. 实现 `Fragment` 组件
3. 创建基础的 DOM 操作工具
4. 实现简单的 `render` 函数

### 阶段 2: Fiber 架构

1. 定义 Fiber 节点结构
2. 实现 Fiber 树的构建
3. 实现双缓存机制
4. 基础的 Reconciler 逻辑

### 阶段 3: 调度器

1. 实现工作循环 (workLoop)
2. 添加时间切片支持
3. 实现任务优先级
4. 可中断渲染机制

### 阶段 4: Hooks 系统

1. 实现 Hooks 的基础架构
2. 实现 `useState` Hook
3. 实现 `useEffect` Hook
4. 实现 `useReducer` Hook

### 阶段 5: 事件系统

1. 实现事件代理机制
2. 创建合成事件对象
3. 事件的绑定和解绑
4. 事件优先级处理

### 阶段 6: 优化和测试

1. 实现完整的 Diff 算法
2. 性能优化
3. 创建测试示例
4. 错误处理和边界情况

## 🔧 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

## 📚 核心概念详解

### Fiber 架构

Fiber 是 React 16 引入的新架构，它将渲染工作分解为小的工作单元，使得 React 可以：

- 暂停工作并稍后恢复
- 为不同类型的工作分配优先级
- 重用之前完成的工作
- 如果不再需要则中止工作

### 双缓存

React 使用双缓存技术：

- **current 树**: 当前显示在屏幕上的 Fiber 树
- **workInProgress 树**: 正在内存中构建的 Fiber 树
- 完成后两棵树会交换，实现快速切换

### 时间切片

通过 `requestIdleCallback` 或 `MessageChannel` 实现：

- 每个时间片最多工作 5ms
- 如果有更高优先级任务，会中断当前工作
- 浏览器空闲时继续之前的工作

### Hooks 原理

Hooks 通过链表存储在 Fiber 节点上：

- 每个 Hook 都有自己的状态
- 通过 `hookIndex` 确保 Hooks 调用顺序
- 依赖数组用于优化性能

## 🎨 示例代码结构

项目完成后，你可以这样使用：

```tsx
import React from "./react";
import ReactDOM from "./react-dom";

function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Counter />);
```

## 🔍 调试技巧

1. **Fiber 树可视化**: 在控制台打印 Fiber 树结构
2. **工作循环跟踪**: 记录每个工作单元的处理过程
3. **Hooks 状态监控**: 跟踪 Hooks 的状态变化
4. **调度器日志**: 记录任务的调度和执行过程

## 📖 学习资源

- [React Fiber 架构](https://github.com/acdlite/react-fiber-architecture)
- [React 源码解析](https://react.jokcy.me/)
- [Build Your Own React](https://pomb.us/build-your-own-react/)

## 🎯 学习目标

完成这个项目后，你将深入理解：

- React 的核心原理和设计思想
- Fiber 架构的优势和实现细节
- Hooks 的工作机制
- 现代前端框架的调度和优化策略
- 虚拟 DOM 和 Diff 算法的实现

开始你的 React 18 实现之旅吧！🚀


```mermaid
graph TB
    subgraph "阶段1: 基础架构"
        A1["createElement<br/>JSX转换"] --> A2["Fragment<br/>多子元素支持"]
        A3["shared-utils<br/>工具函数"] --> A4["DOM操作<br/>基础DOM API"]
        A1 --> A5["Fiber结构<br/>核心数据结构"]
        A3 --> A5
    end
    
    subgraph "阶段2: 渲染引擎"
        A5 --> B1["Reconciler<br/>协调器"]
        A4 --> B1
        B1 --> B2["Scheduler<br/>调度器"]
        B2 --> B3["createRoot & render<br/>渲染入口"]
    end
    
    subgraph "阶段3: Hooks系统"
        B3 --> C1["Hooks架构<br/>基础框架"]
        C1 --> C2["useState<br/>状态管理"]
        C2 --> C3["useEffect<br/>副作用"]
        C2 --> C4["useReducer<br/>复杂状态"]
    end
    
    subgraph "阶段4: 交互能力"
        B3 --> D1["事件系统<br/>用户交互"]
        B1 --> D2["Diff算法<br/>性能优化"]
    end
    
    subgraph "阶段5: 示例验证"
        C2 --> E1["Counter示例<br/>状态测试"]
        D1 --> E1
        C4 --> E2["TodoList示例<br/>列表渲染"]
        D2 --> E2
        C3 --> E3["Effects示例<br/>副作用测试"]
    end
    
    subgraph "阶段6: 优化完善"
        B2 --> F1["批量更新<br/>性能优化"]
        B2 --> F2["优先级调度<br/>响应性优化"]
        C1 --> F3["错误处理<br/>健壮性"]
    end
    
    style A1 fill:#e3f2fd
    style A5 fill:#e8f5e8
    style B2 fill:#fff3e0
    style C2 fill:#fce4ec
    style D1 fill:#f3e5f5
    style E1 fill:#e0f2f1
  ```