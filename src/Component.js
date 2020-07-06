export default class Component {
  constructor() {
    this.parent = null
    this.isTop = false
  }

  set top(bool) {
    this.isTop = bool
    if (bool) {
      this.injectHTML()
    }
  }

  set parentNode(node) {
    setTimeout(() => {
      const isString = typeof node === "string"
      let el = node
      if (isString) {
        el = document.getElementById(node)
      }
      this.parent = el
      // this.injectHTML()
    })
  }

  injectHTML = () => {
    const output = this.render()
    const parent = this.parent
    let html = `${parent.innerHTML}${output}`
    html = this.stripObjects(html)
    parent.innerHTML = html
  }

  stripObjects = (str) => {
    const instances = str.split('[object Object]')
    const out = instances.join('')
    return out
  }

  render = () => {}
}
