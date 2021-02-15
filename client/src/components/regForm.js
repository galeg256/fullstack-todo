import React from 'react'

export default class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      logValue: '',
      pasValue: '',
      repPasValue: '',

      logErrMes: '',
      pasErrMes: '',
      repPasErrMes: '',
    }

    this.handleLogInput = this.handleLogInput.bind(this)
    this.handlePasInput = this.handlePasInput.bind(this)
    this.handleRepPasInput = this.handleRepPasInput.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleLogInput(evt) {
    this.setState({
      logErrMes: '',
      logValue: evt.target.value
    })
  }

  handlePasInput(evt) {
    this.setState({
      pasErrMes: '',
      pasValue: evt.target.value
    })
  }

  handleRepPasInput(evt) {
    this.setState({
      repPasErrMes: '',
      repPasValue: evt.target.value
    })
  }

  handleChangeForm() {
    this.props.changeForm('AuthForm')
  }

  async fetchRegistration() {
    const state = this.state
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({"login": state.logValue, "password": state.pasValue})
    })
    const result = await res.json()
    if (res.ok) {
      alert("Успешная регистрация!")
      //сохраняем токен в сессию
      //открываем todo
      this.props.changeForm('ToDo')
    } else {
      if (res.status === 400)
        alert(result.msg)
      else {   
        let errLogin = ''
        let errPass = ''
        for (let err of result.errors) {
          if (err.param === 'login') errLogin=err.msg
          if (err.param === 'password') errPass=err.msg
        }
        this.setState({
          logErrMes: errLogin,
          pasErrMes: errPass
        })
        // console.log(result)
      }
    }
   
  }

  handleRegistration() {
    const state = this.state 
    if (state.pasValue === state.repPasValue) {
      this.fetchRegistration()
    } else {
      this.setState({repPasErrMes: 'Пароли не совпадают'})
    }

    // if (state.pasValue === state.repPasValue) {
    //   fetch('http://localhost:5000/api/auth/register', {
    //     method: "post",
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify({"login": state.logValue, "password": state.pasValue})
    //   })
    //   .then(res => {
    //     if (res.status !== 200) {
    //       alert("Error")
    //       return
    //     }
    //     //else 
    //     res.json()
    //   })
    //   .then(result => {
    //     console.log("Зашел во второй then")
    //   })
    // } else {
    //   this.setState({repPasErrMes: 'Пароли не совпадают'})
    // }
  }

  render() {
    const state = this.state

    return (
      <div className='reg-form'>
        <div className='reg-form__wrap'>
          <h1 className='reg-form__title'>Регистрация</h1>
          <form className='reg-form__form'>
            <div className='form__login'>
              <span>E-mail:</span>
              <input className='login__input' type='email' value={state.logValue} onChange={this.handleLogInput}/>
            </div>
            <div className='login__error error'>
              <span>{state.logErrMes}</span>
            </div>
            <div className='form__password'>
              <span>Пароль:</span>
              <input className='password__input' type='password' value={state.pasValue} onChange={this.handlePasInput}/>
            </div>
            <div className='password__error error'>
              <span>{state.pasErrMes}</span>
            </div>
            <div className='form__password repeat-password'>
              <span>Повторите пароль:</span>
              <input className='password__input' type='password' value={state.repPasValue} onChange={this.handleRepPasInput}/>
            </div>
            <div className='repeat-password__error error'>
              <span>{state.repPasErrMes}</span>
            </div>
          </form>
          <div className='reg-form__buttons'>
            <button className='btn-enter' onClick={this.handleChangeForm}>Войти</button>
            <button className='btn-reg' onClick={this.handleRegistration}>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    )
  }
}