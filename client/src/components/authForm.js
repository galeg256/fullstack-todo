import React from 'react'

export default class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      logValue: '',
      pasValue: '',
      
      logErrMes: '',
      pasErrMes: ''
    }

    this.handleLogInput = this.handleLogInput.bind(this)
    this.handlePasInput = this.handlePasInput.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleLogInput(evt) {
    this.setState({logValue: evt.target.value})
  }

  handlePasInput(evt) {
    this.setState({pasValue: evt.target.value})
  }

  handleChangeForm() {
    this.props.changeForm('RegisterForm')
  }

  render() {
    const state = this.state

    return (
      <div className='auth-form'>
        <div className='auth-form__wrap'>
          <h1 className='auth-form__title'>Вход</h1>
          <form className='auth-form__form'>
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
          </form>
          <div className='auth-form__buttons'>
            <button className='btn-reg' onClick={this.handleChangeForm}>Зарегистрироваться</button>
            <button className='btn-enter'>Войти</button>
          </div>
        </div>
      </div>
    )
  }
}