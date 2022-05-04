const data = {
    msg: 'Hello world'
}

let vm = {}

Object.defineProperty(vm, 'msg', {
    enumerable: true,
    configurable: true,
    get () {
        return data.msg
    },
    set (msg) {
        if (msg === data.msg) {
            return
        }
        data.msg = msg
        // 更新dom
    }
})

vm.msg = 'hello'
console.log(data.msg)

