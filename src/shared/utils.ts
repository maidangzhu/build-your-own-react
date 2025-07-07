/**
 * 共享工具函数
 * 这些工具函数会在整个项目中被广泛使用
 */

/**
 * 类型检查工具函数
 */

/**
 * 检查是否为函数
 * @param value 要检查的值
 * @returns boolean
 */
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

/**
 * 检查是否为字符串
 * @param value 要检查的值
 * @returns boolean
 */
export function isString(value: any): value is string {
  return typeof value === "string";
}

/**
 * 检查是否为数字
 * @param value 要检查的值
 * @returns boolean
 */
export function isNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * 检查是否为对象（非 null）
 * @param value 要检查的值
 * @returns boolean
 */
export function isObject(value: any): value is object {
  return value !== null && typeof value === "object";
}

/**
 * 检查是否为数组
 * @param value 要检查的值
 * @returns boolean
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * 检查是否为 undefined
 * @param value 要检查的值
 * @returns boolean
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

/**
 * 检查是否为 null
 * @param value 要检查的值
 * @returns boolean
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * 检查是否为 null 或 undefined
 * @param value 要检查的值
 * @returns boolean
 */
export function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 比较工具函数
 */

/**
 * 浅比较两个值是否相等
 * @param a 第一个值
 * @param b 第二个值
 * @returns boolean
 */
export function shallowEqual(a: any, b: any): boolean {
  // 如果是同一个引用，直接返回 true
  if (a === b) {
    return true;
  }

  // 如果其中一个是 null 或 undefined，返回 false
  if (isNullOrUndefined(a) || isNullOrUndefined(b)) {
    return false;
  }

  // 如果不是对象，直接比较
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  // 获取对象的键
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 如果键的数量不同，返回 false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 比较每个键的值
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!keysB.includes(key) || (a as any)[key] !== (b as any)[key]) {
      return false;
    }
  }

  return true;
}

/**
 * 浅比较两个数组是否相等
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns boolean
 */
export function shallowEqualArray(a: any[], b: any[]): boolean {
  if (a === b) {
    return true;
  }

  if (!isArray(a) || !isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

/**
 * 数组工具函数
 */

/**
 * 将值转换为数组
 * @param value 要转换的值
 * @returns 数组
 */
export function arrayify<T>(value: T | T[]): T[] {
  if (isArray(value)) {
    return value;
  }
  return isNullOrUndefined(value) ? [] : [value];
}

/**
 * 扁平化数组
 * @param arr 要扁平化的数组
 * @param depth 扁平化深度，默认为 1
 * @returns 扁平化后的数组
 */
export function flatten<T>(arr: any[], depth: number = 1): T[] {
  return depth > 0
    ? arr.reduce(
        (acc, val) => acc.concat(isArray(val) ? flatten(val, depth - 1) : val),
        []
      )
    : arr.slice();
}

/**
 * 深度扁平化数组
 * @param arr 要扁平化的数组
 * @returns 完全扁平化后的数组
 */
export function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce(
    (acc, val) => acc.concat(isArray(val) ? flattenDeep(val) : val),
    []
  );
}

/**
 * 调试工具函数
 */

/**
 * 开发环境标识
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * 调试日志
 * @param message 日志消息
 * @param data 可选的数据
 */
export function debugLog(message: string, data?: any): void {
  if (isDevelopment) {
    if (data !== undefined) {
      console.log(`[React Debug] ${message}`, data);
    } else {
      console.log(`[React Debug] ${message}`);
    }
  }
}

/**
 * 警告日志
 * @param message 警告消息
 * @param data 可选的数据
 */
export function warn(message: string, data?: any): void {
  if (isDevelopment) {
    if (data !== undefined) {
      console.warn(`[React Warning] ${message}`, data);
    } else {
      console.warn(`[React Warning] ${message}`);
    }
  }
}

/**
 * 错误日志
 * @param message 错误消息
 * @param error 可选的错误对象
 */
export function error(message: string, error?: Error): void {
  if (isDevelopment) {
    if (error) {
      console.error(`[React Error] ${message}`, error);
    } else {
      console.error(`[React Error] ${message}`);
    }
  }
}

/**
 * 性能工具函数
 */

/**
 * 简单的性能计时器
 */
export class PerformanceTimer {
  private startTime: number = 0;
  private endTime: number = 0;

  /**
   * 开始计时
   */
  start(): void {
    this.startTime = performance.now();
  }

  /**
   * 结束计时
   * @returns 耗时（毫秒）
   */
  end(): number {
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  }

  /**
   * 获取耗时
   * @returns 耗时（毫秒）
   */
  getDuration(): number {
    return this.endTime - this.startTime;
  }
}

/**
 * 创建性能计时器
 * @returns PerformanceTimer 实例
 */
export function createTimer(): PerformanceTimer {
  return new PerformanceTimer();
}

/**
 * 其他工具函数
 */

/**
 * 生成唯一 ID
 * @param prefix 前缀
 * @returns 唯一 ID
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
}

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}
