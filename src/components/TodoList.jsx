/** @format */

import React, { useState } from 'react'
import { List, TextField, Button, Grid } from '@mui/material'
import { useObservableState } from 'observable-hooks'
import { map } from 'rxjs/operators'
import { useTodos } from '../store'

import TodoItem from './TodoItem'

function TodoList() {
  const [inputValue, setInputValue] = useState('')

  const { todos$, completedTodos$, uncompletedTodos$ } = useTodos()
  const todos = useObservableState(todos$, [])
  const completedTodos = useObservableState(completedTodos$, [])
  const uncompletedTodos = useObservableState(uncompletedTodos$, [])
  console.log(todos)
  const removeTodo = (index) => {
    todos$.next(todos$.value.filter((_, i) => i !== index))
  }

  const addTodoItem = () => {
    if (inputValue.trim() !== '') {
      todos$.next([
        ...todos$.value,
        { id: Date.now(), text: inputValue, completed: false },
      ])
      setInputValue('')
    }
  }
  const toggleTodoComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
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
          {uncompletedTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={() => toggleTodoComplete(index)}
              onDelete={() => removeTodo(index)}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          {completedTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggleComplete={() => toggleTodoComplete(index)}
              onDelete={() => removeTodo(index)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default TodoList
