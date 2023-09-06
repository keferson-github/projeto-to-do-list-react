import { useState } from 'react'

import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"
import Search from './components/Search'
import Filter from './components/Filter'

import './App.css'

function App() {
const [todos, setTodos] = useState([
  {
    id: 1,
    text: "Atender meus clientes",
    category: "Trabalho",
    IsCompleted: false,
  },
  {
    id: 2,
    text: "Ir para a academia",
    category: "Academia",
    IsCompleted: false,
  },
  {
    id: 3,
    text: "Estudar programação",
    category: "Estudos",
    IsCompleted: false,
  },
])

const [search, setSearch] = useState("")

const [filter, setFilter] = useState("All")
const [sort, setSort] = useState("Asc")

const addTodo = (text, category) => {
  const newTodos = [
    ...todos, 
    {
    id: Math.floor(Math.random() * 1000),
    text,
    category,
    isCompleted: false,
  }
]

setTodos(newTodos)

}

const removeTodo = (id) => {
  const newTodos = [...todos]
  const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null
    )
    setTodos(filteredTodos)
}

const completeTodo = (id) => {
  const newTodos = [...todos]
  newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
  setTodos(newTodos)
}

  return ( 
  <div className="app">
    <h1>Lista de Tarefas</h1>
    <Search search={search} setSearch={setSearch}/>
    <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>

    <div className="todo-list">
      {todos
      .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
      .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : a.text.localeCompare(b.text))
      .map((todo) => (
      <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
      ))}  
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>
  )
}

export default App
