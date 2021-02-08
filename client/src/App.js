import React from 'react'


//App
export default class App extends React.Component {
  

  render() {
    return <div className='wrapper'>
      <ToDo />
    </div>
  }
}


//ToDo
class ToDo extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [
        // {id: '1', text: 'Купить хлеб'},
        // {id: '2', text: 'Купить молоко'},
        // {id: '3', text: 'Купить кофе'}
      ]
    }

    this.addTodo = this.addTodo.bind(this)
    this.delTodo = this.delTodo.bind(this)
    this.saveToDo = this.saveToDo.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(result => {this.setState({todos: result} ) })
  }

  createID() { //генератор id для list-item
    while(true) {
      const id = Math.floor(Math.random() * 1000) // от 1 до 9999
      for (let i=0; i<this.state.todos.length; i++) {
        if (this.state.todos[i].id != id) return id.toString()
      }
    }
  }

  addTodo(newTodoText) {
    // this.state.todos.unshift({id: '1', text: newTodoText})
    // console.log(this.state.todos)
    // this.setState({todos: this.state.todos})

    this.setState( state => {
      const cloneTodos = Object.assign([], state.todos) //клонирование массива
      //Не может аншифтнуть в пустой массив
      if (cloneTodos.length != 0) cloneTodos.unshift({id: this.createID(), text: newTodoText})
      else cloneTodos.unshift({id: '1', text: newTodoText})
      // cloneTodos.splice(0, 0, {id: this.createID(), text: newTodoText} )
      // else cloneTodos.push({id: this.createID(), text: newTodoText})
      return {todos: cloneTodos}
    })
  }

  delTodo(delID) {
    this.setState( state => {
      const pos = state.todos.findIndex( value => value.id === delID)
      const cloneTodos = Object.assign([], state.todos)
      cloneTodos.splice(pos, 1)
      return {todos: cloneTodos}
    })
  }

  saveToDo(todo) {
    let pos
    for (let i=0; i<this.state.todos.length; i++) {
      if (this.state.todos[i].id === todo.id) pos = i
    }

    this.setState( state => {
      const cloneTodos = Object.assign([], state.todos)
      console.log(cloneTodos)
      cloneTodos.splice(pos, 1, {id: todo.id, text: todo.textValue})
      console.log(cloneTodos)
      return {todos: cloneTodos}
    })

  }

  render() {
    return (
      <div className='todo'>
        <AddToDo addTodo={this.addTodo}/>  
        <ListToDo todos={this.state.todos} delTodo={this.delTodo} saveToDo={this.saveToDo}/>
      </div>
    )
  }
}


//AddToDo
class AddToDo extends React.Component {
  constructor() {
    super()
    this.state = {
      addText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange(evt) {
    this.setState({addText: evt.target.value})
  }

  handleAdd(evt) {
    evt.preventDefault()
    console.log('before call parent method')
    this.props.addTodo(this.state.addText)
    console.log('after call parent method')
    this.setState({addText: ''}) 
  }

  render() {
    return (
      <form className='todo__add'>
        <input className='add__input' value={this.state.addText} onChange={this.handleChange}/>
        <button className='add__button' onClick={this.handleAdd}>
          Добавить  
        </button>
      </form>
    )
  }
}


//ListToDo
class ListToDo extends React.Component {
  constructor() {
    super()
    this.state = {
      // changeMode: ['1'], //строковые id для тех строк, которые находятся в статусе на изменение  
      // textValue: ''

      changeMode: [
        // {id: '1', textValue: 'asd'}
      ]
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)

    this.handleSave = this.handleSave.bind(this)
  }

  handleDelete(evt) {
    // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
    const delID = evt.target.closest('.list__item').getAttribute('data-id')
    this.props.delTodo(delID)
  }

  handleChange(evt) { //добавляем моды в ChangeMode
    const target = evt.target.closest('.list__item').getAttribute('data-id')
    // console.log(target) //id изменяемого li
    this.setState( state => {
      const changeModeClone = Object.assign([], state.changeMode)
      changeModeClone.push({id: target, textValue: ''})
      return {changeMode: changeModeClone}
    })
  }

  handleChangeText(evt) {
    // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
    const changeID = evt.target.closest('.list__item').getAttribute('data-id')
    this.setState( state => {
      const changeModeClone = Object.assign([], state.changeMode)
      for (let i=0; i<changeModeClone.length; i++) {
        if (changeModeClone[i].id === changeID) {
          changeModeClone[i].textValue = evt.target.value
          break
        }
      }
      return {changeMode: changeModeClone}
    })
    
  }

  isChangeMode(id) {
    let isMode = false
    for (let item of this.state.changeMode) {
      if (item.id === id) {
        isMode = true
      }
    }
    return isMode
  }

  changeModePos(id) {
    let pos
    for (let i=0; i<this.state.changeMode.length; i++) {
      if (this.state.changeMode[i].id === id) {
        pos = i
      }
    }
    return pos
  }

  handleSave(evt) {
    // console.log(evt.target.closest('.list__item').getAttribute('data-id'))
    const saveID = evt.target.closest('.list__item').getAttribute('data-id')
    const pos = this.changeModePos(saveID) //позиция в массиве changeMode

    this.props.saveToDo(this.state.changeMode[pos])
    // console.log(this.state.changeMode[pos])

    this.setState( state => {
      const changeModeClone = Object.assign([], state.changeMode)
      changeModeClone.splice(pos, 1)
      return {changeMode: changeModeClone}
    })

  }

  render() {

    // console.log(this.isChangeMode('2'))

    const todos = this.props.todos.map( (value, index) => {
      return <li className='list__item' key={index} data-id={value.id}>
        { 
          // this.state.changeMode.includes({id: value.id, textValue: ''}) 
          this.isChangeMode(value.id)
            ? <input className='input__change' value={this.state.changeMode[this.changeModePos(value.id)].textValue} onChange={this.handleChangeText}/> 
            :  `${index + 1}. ${value.text}`
        }
        { 
          this.isChangeMode(value.id)
            ? <button className='btn__save' onClick={this.handleSave}>Сохранить</button> 
            : <button className='btn__change' onClick={this.handleChange}>Изменить</button>
        }
        <button className='btn__delete' onClick={this.handleDelete}>Удалить</button>
      </li>
    })

    return (
      <ul className='todo__list'>
        {todos}
      </ul>
    )
  }
}