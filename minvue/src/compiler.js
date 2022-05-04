import { Watcher } from "./watcher.js"
export class Compiler {
    constructor(vm) {
        this.vm = vm
        this.el = vm.$el

        this.compile(this.el)
    }
    // 编译模版，处理文本节点和元素节点
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElement(node)) {
                this.compileElement(node)
            } else if (this.isTextNode(node)) {
                this.compileText(node)
            }

            // 判断node节点是否有子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node) {
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                attrName = attrName.substr(2)
                const key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    update(node, key, attrName) {
        const updateFn = this[`${attrName}Updater`]
        updateFn && updateFn.call(this, node, key, this.vm[key])
    }
    // v-text
    textUpdater (node, key, value) {
        node.textContent = value
        // 创建Watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // v-model
    modelUpdater (node, key, value) {
        node.value = value
        // 创建Watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener("input", (e) => {
            this.vm[key] = e.target.value
        })
    }
    // 编译文本节点，处理差值表达式
    compileText(node) {
        const reg = /\{\{(.+?)\}\}/
        const text = node.textContent
        if (reg.test(text)) {
            const key = RegExp.$1.trim()
            node.textContent = text.replace(reg, this.vm[key])
            // 创建Watcher对象
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断节点是否是指令
    isDirective(attr) {
        return attr.startsWith("v-")
    }

    isTextNode(node) {
        return node.nodeType === 3
    }

    isElement(node) {
        return node.nodeType === 1
    }
}