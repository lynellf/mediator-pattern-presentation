import Component from "./Component"
import Input from "./Input"

export default class App extends Component {
  constructor(parentNode) {
    super()
    this.parentNode = parentNode
    setTimeout(() => {
      this.top = true
    })
  }

  render = () => {
    const Country = new Input("form", {
      name: "country",
      label: "Country",
      disabled: true,
    })
    const Login = new Input("form", {
      name: "username",
      label: "Login",
      disabled: true,
      nextInput: Country,
    })
    const Email = new Input("form", {
      name: "email",
      label: "Email",
      disabled: true,
      nextInput: Login
    })
    const Name = new Input("form", {
      name: "name",
      label: "Name",
      nextInput: Email,
    })
    return `
      <div id="form">
        <h1>Please Input Values In Order</div>
        ${Name.render()}
        ${Email.render()}
        ${Login.render()}
        ${Country.render()}
      </div>
    `
  }
}
