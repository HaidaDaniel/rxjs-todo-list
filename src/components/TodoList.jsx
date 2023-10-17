/** @format */

import React, { useState } from 'react'
import { List, TextField, Button, Grid } from '@mui/material'
import { useObservableState } from 'observable-hooks'
import { useTodos } from '../store'

import TodoItem from './TodoItem'

function TodoList() {
  const [inputValue, setInputValue] = useState('')

  const { todos$, completedTodos$, uncompletedTodos$ } = useTodos()
  const todos = useObservableState(todos$, [])
  const completedTodos = useObservableState(completedTodos$, [])
  const uncompletedTodos = useObservableState(uncompletedTodos$, [])

  const removeTodo = (id) => {
    todos$.next(todos$.value.filter((todo) => todo.id !== id))
  }

  const addTodoItem = () => {
    if (inputValue.trim() !== '') {
      const newTodo = { id: Date.now(), text: inputValue, completed: false }
      todos$.next([...todos$.value, newTodo])
      setInputValue('')
    }
  }

  const toggleTodoComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    todos$.next(updatedTodos)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label='add new todo'
          variant='outlined'
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={addTodoItem}>
          Add
        </Button>
      </Grid>
      <Grid item xs={6}>
        <List>
          <h3>Uncomplete Todos</h3>
          {uncompletedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={() => toggleTodoComplete(todo.id)}
              onDelete={() => removeTodo(todo.id)}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          <h3>Complete Todos</h3>
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={() => toggleTodoComplete(todo.id)}
              onDelete={() => removeTodo(todo.id)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default TodoList
