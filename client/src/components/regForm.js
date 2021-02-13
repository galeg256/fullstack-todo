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
    this.setState({logValue: evt.target.value})
  }

  handlePasInput(evt) {
    this.setState({pasValue: evt.target.value})
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

  handleRegistration() {
    const state = this.state 
    if (state.pasValue !== state.repPasValue) {
      this.setState({repPasErrMes: 'Пароли не совпадают'})
    }
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