import Component from "./Component"

export default class MedInput extends Component {
  constructor(parentNode, { name, label, disabled = false, mediator }) {
    super()
    this.parentNode = parentNode
    this.name = name
    this.label = label
    this.value = ""
    this.mediator = mediator
    this.disabled = disabled
    window[`_${name}`] = this.handleChange
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
      this.value = oneself.value
      this.mediator.notify(this.name, this.value)
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
