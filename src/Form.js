import Component from './Component'
import MedInput from "./MedInput"

export default class Form extends Component {
  constructor(parentNode) {
    super()
    this.state = {}
    this.parentNode = parentNode
    this.Name = new MedInput("form", {
      name: "name",
      label: "Name",
      mediator: this
    })
    this.Email = new MedInput("form", {
      name: "email",
      label: "Email",
      disabled: true,
      mediator: this
    })
    this.Login = new MedInput("form", {
      name: "username",
      label: "Login",
      disabled: true,
      mediator: this
    })
    this.Country = new MedInput("form", {
      name: "country",
      label: "Country",
      mediator: this,
      disabled: true
    })
    setTimeout(() => {
      this.top = true
    })
  }

  notify = (name, value) => {
    const isName =  name === 'name'
    const isEmail = name === 'email'
    const isLogin = name === 'username'
    const isCountry = name === 'country'
    this.state[name] = value

    if (isName) {
      this.Name.value = value
      this.Email.disabled = false
    }

    if (isEmail) {
      this.Email.value = value
      this.Login.disabled = false
    }

    if (isLogin) {
      this.Login.value = value
      this.Country.disabled = false
    }

    if (isCountry) {
      this.Country.value = value
    }
    console.log(this.state)
  }

  render = () => {
    return `
      <div id="form">
        <h1>Please Input Values In Order</div>
        ${this.Name.render()}
        ${this.Email.render()}
        ${this.Login.render()}
        ${this.Country.render()}
      </div>
    `
  }
}
