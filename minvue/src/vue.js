import { Observer } from './observer.js'
import { Compiler } from './compiler.js'
export class Vue {
    constructor(options) {
        this.$data = options.data || {}
        this.$options = options || {}

        this.$el = typeof options.el ? document.querySelector(options.el) : options.el
        // 1. 数据注入Vue实例
        this._proxyData(this.$data)
        // 2. 创建Observer实例
        this.observer = new Observer(this.$data)
        this.compile = new Compiler(this)
    }

    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(value) {
                    if (data[key] !== value) {
                        data[key] = value
                    }
                }
            })
        })
    }
}