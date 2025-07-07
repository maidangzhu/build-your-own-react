// React Element 类型定义
export interface ReactElement {
  type: string | Function;
  props: any;
  key?: string | number | null;
}

// Fiber 节点类型定义
export interface Fiber {
  type: string | Function | null;
  props: any;
  key?: string | number | null;
  child?: Fiber | null;
  sibling?: Fiber | null;
  parent?: Fiber | null;
  alternate?: Fiber | null;
  effectTag?: number;
  stateNode?: any;
  hooks?: Hook[];
  hookIndex?: number;
}

// Hook 类型定义
export interface Hook {
  state: any;
  queue: any[];
  deps?: any[];
}

// 更新类型
export interface Update {
  action: any;
  next?: Update;
}

// 工作单元类型
export type WorkUnit = Fiber | null;

// 效果标记
export const PLACEMENT = 1;
export const UPDATE = 2;
export const DELETION = 3;
