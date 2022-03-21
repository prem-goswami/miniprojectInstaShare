import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  loginClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgContainer">
        <div className="loginContainer">
          <div className="imgContainer">
            <img
              src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647488432/homeScreenLogo_tg0cp3.png"
              alt="website login"
            />
          </div>
          <div className="inputContainer">
            <img
              src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647488445/instaShareLogo_wfbdew.png"
              alt="website logo"
            />
            <h1>Insta Share</h1>
            <form className="formContainer" onSubmit={this.loginClicked}>
              <label htmlFor="userName" className="labelText">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="inputBar"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password" className="labelText">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="inputBar"
                onChange={this.onChangePassword}
              />
              <button type="submit" className="loginButton">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
