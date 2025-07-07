# React 18 实现指南

## 🎯 实现策略

### 核心原则

1. **渐进式实现**: 从最简单的功能开始，逐步增加复杂性
2. **测试驱动**: 每实现一个功能，立即创建测试用例验证
3. **理解优先**: 重点理解原理，而非完美复制 React 的所有细节
4. **可调试性**: 添加充分的日志和调试信息

## 📋 实现顺序详解

### 阶段 1: JSX 和基础工具 (1-2 天) ✅ **已完成**

#### 1.1 实现 `createElement` 函数 ✅

```typescript
// 目标: src/react/jsx/createElement.ts
// 功能: 将 JSX 转换为 React Element 对象
// 重点:
// - 处理 children 的扁平化
// - 支持文本节点
// - 处理 props 的传递
```

**实现要点:**

- ✅ 接收 `type`, `props`, `...children` 参数
- ✅ 扁平化 children 数组，过滤 null/undefined
- ✅ 将文本和数字转换为文本节点
- ✅ 返回标准的 ReactElement 对象
- ✅ 额外实现了 `isValidElement` 和 `cloneElement` 工具函数

#### 1.2 实现 `Fragment` 组件 ✅

```typescript
// 目标: src/react/jsx/Fragment.ts
// 功能: 支持多个子元素而不创建额外DOM节点
// 重点: Fragment 是一个特殊的 Symbol
```

**实现要点:**

- ✅ 使用 `Symbol.for('react.fragment')` 创建 Fragment 标识
- ✅ 实现了 `isFragment` 和 `isFragmentElement` 检查函数
- ✅ 提供了 `createFragment` 便捷创建函数

#### 1.3 创建共享工具函数 ✅

```typescript
// 目标: src/shared/utils.ts
// 功能: 类型检查、浅比较、数组化等工具函数
// 重点: 这些工具会在整个项目中被广泛使用
```

**实现要点:**

- ✅ **类型检查工具**: `isFunction`, `isString`, `isNumber`, `isObject`, `isArray`, `isNull`, `isUndefined`, `isNullOrUndefined`
- ✅ **比较工具**: `shallowEqual`, `shallowEqualArray` - 用于 props 和依赖数组的比较
- ✅ **数组工具**: `arrayify`, `flatten`, `flattenDeep` - 用于处理 children 和其他数组操作
- ✅ **调试工具**: `debugLog`, `warn`, `error`, `isDevelopment` - 用于开发时的调试和错误提示
- ✅ **性能工具**: `PerformanceTimer`, `createTimer` - 用于性能监控
- ✅ **其他工具**: `generateId`, `debounce`, `throttle` - 通用工具函数

### 阶段 2: Fiber 架构 (3-4 天)

#### 2.1 定义 Fiber 数据结构

```typescript
// 目标: src/shared/types.ts 和 src/react/reconciler/fiber.ts
// 功能: React 18 的核心数据结构
// 重点:
// - 链表结构 (child, sibling, parent)
// - 双缓存指针 (alternate)
// - 工作状态标记 (effectTag)
```

**关键概念:**

- **Fiber 节点**: 代表一个工作单元
- **链表遍历**: 深度优先遍历 Fiber 树
- **双缓存**: current 树和 workInProgress 树

#### 2.2 实现基础 DOM 操作

```typescript
// 目标: src/react-dom/client/domUtils.ts
// 功能: 创建、更新、删除 DOM 节点
// 重点:
// - 属性更新的差异化处理
// - 事件属性的特殊处理
// - 文本节点的处理
```

#### 2.3 实现协调器 (Reconciler)

```typescript
// 目标: src/react/reconciler/index.ts
// 功能: 比较新旧 Fiber 树，标记需要的变更
// 重点:
// - beginWork: 开始处理一个 Fiber 节点
// - completeWork: 完成一个 Fiber 节点的处理
// - 不同类型组件的处理逻辑
```

### 阶段 3: 调度器 (2-3 天)

#### 3.1 实现工作循环

```typescript
// 目标: src/react/scheduler/workLoop.ts
// 功能: 控制 Fiber 树的遍历和处理
// 重点:
// - 深度优先遍历
// - 可中断的渲染
// - 时间切片支持
```

**核心算法:**

```
workLoop():
  while (nextUnitOfWork && !shouldYield()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
```

#### 3.2 实现时间切片

```typescript
// 目标: src/react/scheduler/timeSlicing.ts
// 功能: 将长任务分解为小任务，避免阻塞主线程
// 重点:
// - 使用 MessageChannel 或 setTimeout
// - 5ms 时间片限制
// - 优先级调度
```

#### 3.3 实现 createRoot 和 render

```typescript
// 目标: src/react-dom/client/createRoot.ts
// 功能: ReactDOM 的入口点
// 重点:
// - 创建 FiberRoot
// - 启动首次渲染
// - 连接调度器
```

### 阶段 4: Hooks 系统 (4-5 天)

#### 4.1 Hooks 基础架构

```typescript
// 目标: src/react/hooks/index.ts
// 功能: Hooks 的基础设施
// 重点:
// - Hook 链表管理
// - currentFiber 和 hookIndex
// - mount 和 update 阶段的区分
```

**核心概念:**

- **Hook 链表**: 每个 Fiber 节点维护一个 Hook 链表
- **调用顺序**: Hooks 必须按相同顺序调用
- **阶段区分**: mount 阶段创建，update 阶段更新

#### 4.2 实现 useState

```typescript
// 目标: src/react/hooks/useState.ts
// 功能: 状态管理 Hook
// 重点:
// - 状态的存储和更新
// - dispatchAction 的实现
// - 函数式更新支持
// - 批量更新机制
```

#### 4.3 实现 useEffect

```typescript
// 目标: src/react/hooks/useEffect.ts
// 功能: 副作用处理 Hook
// 重点:
// - 依赖数组的比较
// - 清理函数的执行时机
// - effect 的调度和执行
```

#### 4.4 实现 useReducer

```typescript
// 目标: src/react/hooks/useReducer.ts
// 功能: 复杂状态管理 Hook
// 重点:
// - reducer 函数的调用
// - 与 useState 共享更新机制
// - 初始化函数支持
```

### 阶段 5: 事件系统 (2-3 天)

#### 5.1 事件代理机制

```typescript
// 目标: src/react-dom/events/EventListener.ts
// 功能: 在根节点统一处理所有事件
// 重点:
// - 事件的委托和冒泡
// - 事件类型的映射
// - 性能优化
```

#### 5.2 合成事件

```typescript
// 目标: src/react-dom/events/SyntheticEvent.ts
// 功能: 跨浏览器兼容的事件对象
// 重点:
// - 标准化事件接口
// - 阻止默认行为和冒泡
// - 事件池机制（可选）
```

### 阶段 6: 示例和测试 (2-3 天)

#### 6.1 Counter 示例

```typescript
// 目标: src/examples/Counter.tsx
// 功能: 测试 useState 和事件处理
// 验证: 点击按钮能正确更新计数
```

#### 6.2 TodoList 示例

```typescript
// 目标: src/examples/TodoList.tsx
// 功能: 测试列表渲染和复杂状态管理
// 验证: 添加、删除、切换状态功能
```

#### 6.3 Effects 示例

```typescript
// 目标: src/examples/EffectExample.tsx
// 功能: 测试 useEffect 的各种用法
// 验证: 依赖数组、清理函数等
```

## 🔧 调试技巧

### 1. Fiber 树可视化

```typescript
function logFiberTree(fiber: Fiber, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(`${indent}${fiber.type} - ${fiber.key}`);

  let child = fiber.child;
  while (child) {
    logFiberTree(child, depth + 1);
    child = child.sibling;
  }
}
```

### 2. 工作循环跟踪

```typescript
function performUnitOfWork(fiber: Fiber) {
  console.log("Processing:", fiber.type, fiber.props);
  // ... 实际处理逻辑
}
```

### 3. Hooks 状态监控

```typescript
function useState<T>(initialState: T) {
  console.log("useState called with:", initialState);
  // ... 实际实现
}
```

## 📊 性能考虑

### 1. 避免不必要的重新渲染

- 实现 `memo` 优化（高级功能）
- 使用 `key` 优化列表渲染
- 合理使用 `useEffect` 依赖数组

### 2. 批量更新

- 在同一事件循环中批量处理状态更新
- 避免连续的 DOM 操作

### 3. 时间切片优化

- 合理设置时间片大小
- 优先级调度的实现

## 🚨 常见陷阱

### 1. Hooks 调用顺序

```typescript
// ❌ 错误：条件调用
if (condition) {
  const [state] = useState(0);
}

// ✅ 正确：始终相同顺序
const [state] = useState(0);
if (condition) {
  // 使用 state
}
```

### 2. 无限循环

```typescript
// ❌ 错误：缺少依赖数组
useEffect(() => {
  setState(state + 1);
});

// ✅ 正确：正确的依赖数组
useEffect(() => {
  setState(state + 1);
}, []); // 只在 mount 时执行
```

### 3. 内存泄漏

```typescript
// ❌ 错误：未清理副作用
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // 忘记清理
}, []);

// ✅ 正确：清理副作用
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

## 📈 扩展功能

实现基础功能后，可以考虑添加：

1. **更多 Hooks**: `useContext`, `useMemo`, `useCallback`
2. **错误边界**: 组件错误处理
3. **Suspense**: 异步组件加载
4. **服务端渲染**: SSR 支持
5. **开发工具**: DevTools 集成

## 🎯 学习检查点

每完成一个阶段，问自己：

- [ ] 我理解这个功能的核心原理吗？
- [ ] 我能解释它是如何工作的吗？
- [ ] 我知道它在 React 生态中的作用吗？
- [ ] 我能独立实现类似的功能吗？

完成整个项目后，你将对 React 18 的核心机制有深入的理解！🚀
