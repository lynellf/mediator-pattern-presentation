import Component from "./Component"

export default class MedInput extends Component {
  constructor(parentNode, { name, label, disabled = false, mediator, value = '' }) {
    super()
    this.parentNode = parentNode
    this.name = name
    this.label = label
    this.mediator = mediator
    window[`_${name}`] = this.handleChange
    setTimeout(() => {
      this.disabled = disabled
      this.value = value
    }, 200)
  }

  set disabled(bool) {
    this.toggleDisable(bool)
  }

  set value(str) {
    this.defineSelf().then(element => {
      element.setAttribute('value', str)
    })
  }

  get value() {
    const element = document.getElementById(this.name)
    return element.getAttribute('value')
  }

  defineSelf = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const oneself = document.getElementById(this.name)
        this.self = oneself
        resolve(oneself)
      })
    })
  }

  mount = () => {
    this.defineSelf().then((oneself) => {
      this.toggleDisable(this.disabled)
      this.self = oneself
      oneself.setAttribute("onchange", `_${this.name}()`)
    })
  }

  toggleDisable = (state) => {
    const isDisabled = state === true
    if (isDisabled) {
      this.self.setAttribute("disabled", "true")
      this.self.style = "background: lightgrey"
      return
    }

    this.self.removeAttribute("disabled")
    this.self.style = "background: initial"
  }

  handleChange = () => {
    this.defineSelf().then((oneself) => {
      this.mediator.notify(this.name, oneself.value)
      setTimeout(() => console.log(this.value))
    })
  }

  render = () => {
    this.mount()
    return `
      <div>
        <label for="${this.name}">${this.label}</label>
        <input 
          name="${this.name}" 
          id="${this.name}" 
          />
      </div>
    `
  }
}
