const data = {
    msg: 'Hello world',
    code: 0
}

const vm = {}

const proxyData = (data) => {
    Object.keys(data).forEach(key => {
        Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get () {
                console.log("get")
                return data[key]
            },
            set (val) {
                if (data === val) {
                    return false
                }
                console.log('set', val, key)
                data[key] = val
                // 更新dom
                return false
            }
        })
    })
}
proxyData(data)
vm.code = 100
console.log(data.code)