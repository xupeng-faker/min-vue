import { Dep } from './dep.js'
export class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1.判断data是否是空值或者对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data中的属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(data, key, value) {
        // 负责收集依赖
        const dep = new Dep()
        //  将对象转换成响应式对象
        this.walk(value)
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newValue) => {
                if (newValue !== value) {
                    this.walk(newValue)
                    value = newValue
                    dep.notify()
                }
            }
        })
    }
}