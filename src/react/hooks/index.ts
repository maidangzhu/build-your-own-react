/**
 * React Hooks 入口文件
 * 这里暂时提供空的实现，后续会逐步完善
 */

/**
 * useState Hook - 状态管理
 * @param initialState 初始状态
 * @returns [state, setState] 元组
 */
export function useState<T>(
  initialState: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  // 临时实现，后续会完善
  const state =
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState;
  const setState = (value: T | ((prev: T) => T)) => {
    console.warn("useState not implemented yet");
  };
  return [state, setState];
}

/**
 * useEffect Hook - 副作用处理
 * @param effect 副作用函数
 * @param deps 依赖数组
 */
export function useEffect(
  effect: () => void | (() => void),
  deps?: any[]
): void {
  // 临时实现，后续会完善
  console.warn("useEffect not implemented yet");
}

/**
 * useReducer Hook - 复杂状态管理
 * @param reducer reducer 函数
 * @param initialState 初始状态
 * @returns [state, dispatch] 元组
 */
export function useReducer<T, A>(
  reducer: (state: T, action: A) => T,
  initialState: T
): [T, (action: A) => void] {
  // 临时实现，后续会完善
  const dispatch = (action: A) => {
    console.warn("useReducer not implemented yet");
  };
  return [initialState, dispatch];
}
