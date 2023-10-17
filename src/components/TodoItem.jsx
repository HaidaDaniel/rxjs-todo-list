/** @format */
import React from 'react'
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'

const listItemStyle = {
  margin: ' 10px 0',
  background: '#8DC0C8',
  border: '1px solid #ccc',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}

function TodoItem({ text, completed, onToggleComplete, onDelete }) {
  return (
    <ListItem style={listItemStyle}>
      <ListItemIcon>
        <Checkbox
          checked={completed}
          onClick={onToggleComplete}
          icon={<CheckIcon />}
          checkedIcon={<CheckIcon style={{ color: 'green' }} />}
        />
      </ListItemIcon>
      <ListItemText
        primary={text}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      />
      <ListItemIcon>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}

export default TodoItem
