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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label='Добавить новое задание'
          variant='outlined'
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={addTodoItem}>
          Добавить
        </Button>
      </Grid>
      <Grid item xs={12}>
        <List>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              onDelete={() => removeTodo(index)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default TodoList
