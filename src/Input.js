import Component from "./Component"

export default class Input extends Component {
  constructor(parentNode, { name, label, disabled = false, nextInput }) {
    super()
    this.parentNode = parentNode
    this.name = name
    this.label = label
    this.value = ""
    this.nextInput = nextInput
    window[`_${name}`] = this.handleChange
    this.defineSelf().then((oneself) => {
      this.toggleDisable(disabled)
      this.self = oneself
      oneself.setAttribute("onchange", `_${name}()`)
    })
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
    this.defineSelf().then((element) => {
      this.value = element.value
      const hasValue = this.value.length > 0
      const isReady = this.nextInput && hasValue
      if (isReady) {
        this.nextInput.toggleDisable(false)
      }

      if (!isReady) {
        this.nextInput.toggleDisable(true)
      }
    })
  }

  render = () => {
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
