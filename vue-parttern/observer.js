// 观察者模式

// 目标 发布者
class Dep {
    constructor() {
        // 存储所有观察者
        this.subs = []
    }
    // 添加观察者
    addSubs(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 通知所有观察者
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}

// 观察者 - 订阅者
class Watcher {
    update() {
        console.log('update')
    }
}

const dep = new Dep
const watcher = new Watcher

dep.addSubs(watcher)

dep.notify()