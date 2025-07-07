import { ReactElement } from "../../shared/types";

/**
 * 创建 React 元素
 * @param type 元素类型 (string 或 function)
 * @param props 元素属性
 * @param children 子元素
 * @returns ReactElement
 */
export function createElement(
  type: string | Function,
  props: any,
  ...children: any[]
): ReactElement {
  // 处理 props，如果为 null 则设为空对象
  const finalProps = props || {};

  // 处理 children：扁平化数组，过滤掉 null/undefined/boolean
  const processedChildren = children
    .flat(Infinity) // 扁平化嵌套数组
    .filter(
      (child) =>
        child !== null && child !== undefined && typeof child !== "boolean"
    ) // 过滤无效值
    .map((child) => {
      // 将字符串和数字转换为文本节点
      if (typeof child === "string" || typeof child === "number") {
        return {
          type: "TEXT_ELEMENT",
          props: {
            nodeValue: child,
            children: [],
          },
          key: null,
        };
      }
      return child;
    });

  // 如果有子元素，将其添加到 props 中
  if (processedChildren.length > 0) {
    finalProps.children = processedChildren;
  }

  // 提取 key 属性
  const key = finalProps.key || null;
  if (finalProps.key) {
    delete finalProps.key; // 从 props 中移除 key
  }

  return {
    type,
    props: finalProps,
    key,
  };
}

/**
 * 检查是否为有效的 React 元素
 * @param element 要检查的元素
 * @returns boolean
 */
export function isValidElement(element: any): element is ReactElement {
  return (
    typeof element === "object" &&
    element !== null &&
    element.type !== undefined &&
    element.props !== undefined
  );
}

/**
 * 克隆 React 元素并可选地覆盖 props
 * @param element 要克隆的元素
 * @param props 要覆盖的 props
 * @param children 要覆盖的子元素
 * @returns 克隆的 ReactElement
 */
export function cloneElement(
  element: ReactElement,
  props?: any,
  ...children: any[]
): ReactElement {
  const newProps = { ...element.props, ...props };

  if (children.length > 0) {
    newProps.children = children;
  }

  return createElement(element.type, newProps);
}
