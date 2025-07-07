/**
 * React Fragment 符号
 * Fragment 是一个特殊的组件类型，用于包装多个子元素而不创建额外的 DOM 节点
 */
export const Fragment = Symbol.for("react.fragment");

/**
 * 检查是否为 Fragment 类型
 * @param type 要检查的类型
 * @returns boolean
 */
export function isFragment(type: any): boolean {
  return type === Fragment;
}

/**
 * 创建 Fragment 元素的便捷函数
 * @param props Fragment 的 props (通常只包含 children)
 * @returns Fragment 元素
 */
export function createFragment(props: { children?: any[] }) {
  return {
    type: Fragment,
    props: props || { children: [] },
    key: null,
  };
}

/**
 * 检查 ReactElement 是否为 Fragment
 * @param element React 元素
 * @returns boolean
 */
export function isFragmentElement(element: any): boolean {
  return element && element.type === Fragment;
}
