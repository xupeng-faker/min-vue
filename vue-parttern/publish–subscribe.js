
// 发布订阅模式
class EventEmitter {
    constructor() {
        this.subs = Object.create(null)
    }

    // 订阅者 //订阅通知
    $on(eventType, handler) {
        this.subs[eventType] = this.subs[eventType] ?? []
        this.subs[eventType].push(handler)
    }

    // 发布者 //发布通知
    $emit(eventType) {
        if (this.subs[eventType]) {
            this.subs[eventType].forEach(handler => handler())
        }
    }
}

const bus = new EventEmitter()

bus.$on('click', () => { console.log('click1') })
bus.$on('click', () => { console.log('click2') })


bus.$emit('click')