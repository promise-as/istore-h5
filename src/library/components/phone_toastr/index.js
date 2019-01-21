import './index.scss'

class PhoneToastr {
    constructor(opt) {
        this.init(opt)

        this.option = {}
    }
    init(opt) {
        if (opt) {
            this.option.type = opt.type || this.option.type
            this.option.msg = opt.msg || this.option.msg
            this.option.time = opt.time || this.option.time

            this.create()
        }
    }
    time() {
        setTimeout(() => {
            this.remove()
        }, this.option.time || 3000)
    }
    create() {
        let opt = this.option
        let icon
        let text
        let wrap
        let doc

        icon = document.createElement('i')

        text = document.createElement('span')
        text.className = 'toast-text'
        text.innerText = this.option.msg

        wrap = document.createElement('div')
        wrap.id = 'phonetoast-plugin-wrap'

        doc = document.getElementById('istore-app')

        if (opt.type === 'success') {
            // icon.className = 'icon-done'
            wrap.className = 'toast-plugin-success'
        }

        if (opt.type === 'error') {
            // icon.className = 'icon-cross'
            wrap.className = 'toast-plugin-error'
        }

        if (opt.type === 'warning') {
            // icon.className = 'icon-bell'
            wrap.className = 'toast-plugin-warning'
        }

        if (opt.type === 'info') {
            icon.className = 'icon-wrong'
            wrap.className = 'toast-plugin-info'
        }

        wrap.appendChild(icon)
        wrap.appendChild(text)
        doc.appendChild(wrap)

        this.id = wrap

        this.time()
    }

    remove() {
        if (this.id) {
            let doc = document.getElementById('istore-app')
            doc.removeChild(this.id)
            this.id = null
        }
    }

    success(msg) {
        this.option.msg = msg || '成功'
        this.option.type = 'success'
        this.create()
    }

    error(msg) {
        this.option.msg = msg || '网络失败'
        this.option.type = 'error'
        this.create()
    }

    info(msg) {
        this.option.msg = msg || '提醒'
        this.option.type = 'info'
        this.create()
    }

    warning(msg) {
        this.option.msg = msg || '警告'
        this.option.type = 'warning'
        this.create()
    }
}

export default PhoneToastr