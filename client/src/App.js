import React from 'react'
import ToDo from './components/todo.js'
import AuthForm from './components/authForm.js'
import RegisterForm from './components/regForm.js' 
//App
export default class App extends React.Component {
  constructor () {
    super() 
    this.state = {
      isLogged: false,
      //AuthForm - стартовая форма
      formType: 'AuthForm' //отвечает за отображаемую форму
      // formType: 'RegisterForm'
    }

    this.changeForm = this.changeForm.bind(this)
  }

  changeForm(type) {
    this.setState({formType: type})
  }

  selectForm() {
    switch(this.state.formType) {
      case 'AuthForm': return <AuthForm changeForm={this.changeForm}/>
      case 'RegisterForm': return <RegisterForm changeForm={this.changeForm}/>
      //ToDo не имеет право выбора формы, но позднее необходимо будет это реализовать, 
      //т.к. пользователь должен иметь возможность смены аккаунта из рабочей области
      case 'ToDo': return <ToDo /> 
    }
  }

  render() {
    // const state = this.state

    // const form = state.isLogged ? <ToDo />
    //   : state.isReg ? <RegisterForm />
    //   : <AuthForm />
    const form = this.selectForm()

    return <div className='wrapper'>
      {/* <AuthForm /> */}
      {/* <RegisterForm /> */}
      {/* <ToDo /> */}
      {form}
    </div>
  }
}
































// class AuthForm extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       logValue: '',
//       pasValue: ''
//     }

//     this.handleLogInput = this.handleLogInput.bind(this)
//     this.handlePasInput = this.handlePasInput.bind(this)
//   }

//   handleLogInput(evt) {
//     this.setState({logValue: evt.target.value})
//   }

//   handlePasInput(evt) {
//     this.setState({pasValue: evt.target.value})
//   }

//   render() {
//     const state = this.state

//     return (
//       <div className='auth-form'>
//         <div className='auth-form__wrap'>
//           <h1 className='auth-form__title'>Вход</h1>
//           <form className='auth-form__form'>
//             <div className='form__login'>
//               <span>E-mail:</span>
//               <input className='login__input' type='email' value={state.logValue} onChange={this.handleLogInput}/>
//             </div>
//             <div className='form__password'>
//               <span>Пароль:</span>
//               <input className='password__input' type='password' value={state.pasValue} onChange={this.handlePasInput}/>
//             </div>
//           </form>
//           <div className='auth-form__buttons'>
//             <button className='btn-reg'>Зарегистрироваться</button>
//             <button className='btn-enter'>Войти</button>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// class RegisterForm extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       logValue: '',
//       pasValue: '',
//       repPasValue: ''
//     }

//     this.handleLogInput = this.handleLogInput.bind(this)
//     this.handlePasInput = this.handlePasInput.bind(this)
//     this.handleRepPasInput = this.handleRepPasInput.bind(this)
//   }

//   handleLogInput(evt) {
//     this.setState({logValue: evt.target.value})
//   }

//   handlePasInput(evt) {
//     this.setState({pasValue: evt.target.value})
//   }

//   handleRepPasInput(evt) {
//     this.setState({repPasValue: evt.target.value})
//   }

//   render() {
//     const state = this.state

//     return (
//       <div className='reg-form'>
//         <div className='reg-form__wrap'>
//           <h1 className='reg-form__title'>Регистрация</h1>
//           <form className='reg-form__form'>
//             <div className='form__login'>
//               <span>E-mail:</span>
//               <input className='login__input' type='email' value={state.logValue} onChange={this.handleLogInput}/>
//             </div>
//             <div className='form__password'>
//               <span>Пароль:</span>
//               <input className='password__input' type='password' value={state.pasValue} onChange={this.handlePasInput}/>
//             </div>
//             <div className='form__password repeat-password'>
//               <span>Повторите пароль:</span>
//               <input className='password__input' type='password' value={state.repPasValue} onChange={this.handleRepPasInput}/>
//             </div>
//           </form>
//           <div className='reg-form__buttons'>
//             <button className='btn-enter'>Войти</button>
//             <button className='btn-reg'>Зарегистрироваться</button>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }





////////////////////////////////////////////////////////////////
//Код написанный ниже импортируется из /components/todo/component.js
////////////////////////////////////////////////////////////////
// //ToDo
// class ToDo extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       todos: [
//         {id: '1', text: 'Купить хлеб'},
//         {id: '2', text: 'Купить молоко'},
//         {id: '3', text: 'Купить кофе'}
//       ]
//     }

//     this.addTodo = this.addTodo.bind(this)
//     this.delTodo = this.delTodo.bind(this)
//     this.saveToDo = this.saveToDo.bind(this)
//   }

//   componentDidMount() {
//     console.log("mount")
//     fetch('http://localhost:5000/api')
//       .then(response => response.json())
//       //.then(result => {this.setState({todos: result} ) })
//       .then(result => {this.setState(state => {
//         for(let item of result) {
//           item.id = item.id.toString()
//         }
//         return {todos: result}
//       } ) })
      
//   }
//   // componentDidUpdate(prevProps, prevState) {
//   //   // if (prevState)
//   //   // console.log(prevState)
//   //   if (prevState.todos.length && (this.state.todos.length < prevState.todos.length)) {
//   //     //console.log(prevState)

//   //     console.log("delete")
//   //   }
//   // }

//   createID() { //генератор id для list-item
//     while(true) {
//       const id = Math.floor(Math.random() * 1000) // от 1 до 9999
//       for (let i=0; i<this.state.todos.length; i++) {
//         if (this.state.todos[i].id != id) return id.toString()
//       }
//     }
//   }

//   addTodo(newTodoText) {
//     // this.state.todos.unshift({id: '1', text: newTodoText})
//     // console.log(this.state.todos)
//     // this.setState({todos: this.state.todos})
//     console.log({"name": newTodoText})
    
//     fetch('http://localhost:5000/api/', {
//       method: "post",
//       headers: {'Content-Type':'application/json'},
//       body: JSON.stringify({"name": newTodoText})
//     })
//     .then(res => res.json())
//     .then(result => {
//       this.setState(state => {
//         const cloneTodos = Object.assign([], state.todos) //клонирование массива
//         if (cloneTodos.length != 0) cloneTodos.unshift({id: result[0].id.toString(), text: newTodoText})
//         else cloneTodos.unshift({id: result[0].id.toString(), text: newTodoText})
//         return {todos: cloneTodos}
//       })
//     })
//   }

//   delTodo(delID) {
//     fetch(`http://localhost:5000/api/delete/${delID}`, {
//       method: "delete"
//     })
//     //.then(response => response.json())
//     .then(result => {
//       console.log(result)
//       if (result.status==200) {
//         this.setState( state => {
//         const pos = state.todos.findIndex( value => value.id === delID)
//         const cloneTodos = Object.assign([], state.todos)
//         cloneTodos.splice(pos, 1)
//         return {todos: cloneTodos}
//         })
//       } else console.log("error delete")
//     })
//   }

//   saveToDo(todo) {
//     console.log(todo)
//     fetch('http://localhost:5000/api/update', {
//       method: "put",
//       headers: {'Content-Type':'application/json'},
//       body: JSON.stringify(todo)
//     })
//     //.then(res => res.json())
//     .then(result => {    
//       if (result.status == 200) {
//         let pos
//         for (let i=0; i<this.state.todos.length; i++) {
//           if (this.state.todos[i].id === todo.id) pos = i
//         }

//         this.setState( state => {
//           const cloneTodos = Object.assign([], state.todos)
//           cloneTodos.splice(pos, 1, {id: todo.id, text: todo.textValue})
//           return {todos: cloneTodos}
//         })
//       }
//     })
//   }

//   render() {
//     return (
//       <div className='todo'>
//         <AddToDo addTodo={this.addTodo}/>  
//         <ListToDo todos={this.state.todos} delTodo={this.delTodo} saveToDo={this.saveToDo}/>
//       </div>
//     )
//   }
// }


// //AddToDo
// class AddToDo extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       addText: ''
//     }

//     this.handleChange = this.handleChange.bind(this)
//     this.handleAdd = this.handleAdd.bind(this)
//   }

//   handleChange(evt) {
//     this.setState({addText: evt.target.value})
//   }

//   handleAdd(evt) {
//     evt.preventDefault()
//     this.props.addTodo(this.state.addText)
//     this.setState({addText: ''}) 
//   }

//   render() {
//     return (
//       <form className='todo__add'>
//         <input className='add__input' value={this.state.addText} onChange={this.handleChange}/>
//         <button className='add__button' onClick={this.handleAdd}>
//           Добавить  
//         </button>
//       </form>
//     )
//   }
// }


// //ListToDo
// class ListToDo extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       // changeMode: ['1'], //строковые id для тех строк, которые находятся в статусе на изменение  
//       // textValue: ''

//       changeMode: [
//         // {id: '1', textValue: 'asd'}
//       ]
//     }

//     this.handleDelete = this.handleDelete.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleChangeText = this.handleChangeText.bind(this)

//     this.handleSave = this.handleSave.bind(this)
//   }

//   handleDelete(evt) {
//     // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
//     const delID = evt.target.closest('.list__item').getAttribute('data-id')
//     this.props.delTodo(delID)
//   }

//   handleChange(evt) { //добавляем моды в ChangeMode
//     const target = evt.target.closest('.list__item').getAttribute('data-id')
//     // console.log(target) //id изменяемого li
//     this.setState( state => {
//       const changeModeClone = Object.assign([], state.changeMode)
//       changeModeClone.push({id: target, textValue: ''})
//       return {changeMode: changeModeClone}
//     })
//   }

//   handleChangeText(evt) {
//     // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
//     const changeID = evt.target.closest('.list__item').getAttribute('data-id')
//     this.setState( state => {
//       const changeModeClone = Object.assign([], state.changeMode)
//       for (let i=0; i<changeModeClone.length; i++) {
//         if (changeModeClone[i].id === changeID) {
//           changeModeClone[i].textValue = evt.target.value
//           break
//         }
//       }
//       return {changeMode: changeModeClone}
//     })
    
//   }

//   isChangeMode(id) {
//     let isMode = false
//     for (let item of this.state.changeMode) {
//       if (item.id === id) {
//         isMode = true
//       }
//     }
//     return isMode
//   }

//   changeModePos(id) {
//     let pos
//     for (let i=0; i<this.state.changeMode.length; i++) {
//       if (this.state.changeMode[i].id === id) {
//         pos = i
//       }
//     }
//     return pos
//   }

//   handleSave(evt) {
//     // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
//     const saveID = evt.target.closest('.list__item').getAttribute('data-id')
//     const pos = this.changeModePos(saveID) //позиция в массиве changeMode

//     this.props.saveToDo(this.state.changeMode[pos])
//     // console.log(this.state.changeMode[pos])

//     this.setState( state => {
//       const changeModeClone = Object.assign([], state.changeMode)
//       changeModeClone.splice(pos, 1)
//       return {changeMode: changeModeClone}
//     })

//   }

//   render() {

//     // console.log(this.isChangeMode('2'))

//     const todos = this.props.todos.map( (value, index) => {
//       return <li className='list__item' key={index} data-id={value.id}>
//         { 
//           // this.state.changeMode.includes({id: value.id, textValue: ''}) 
//           this.isChangeMode(value.id)
//             ? <input className='input__change' value={this.state.changeMode[this.changeModePos(value.id)].textValue} onChange={this.handleChangeText}/> 
//             :  `${index + 1}. ${value.text}`
//         }
//         { 
//           this.isChangeMode(value.id)
//             ? <button className='btn__save' onClick={this.handleSave}>Сохранить</button> 
//             : <button className='btn__change' onClick={this.handleChange}>Изменить</button>
//         }
//         <button className='btn__delete' onClick={this.handleDelete}>Удалить</button>
//       </li>
//     })

//     return (
//       <ul className='todo__list'>
//         {todos}
//       </ul>
//     )
//   }
// }