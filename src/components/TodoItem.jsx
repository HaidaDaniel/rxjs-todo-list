/** @format */

import { ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function TodoItem({ text, onDelete }) {
  return (
    <ListItem>
      <ListItemText primary={text} />
      <ListItemIcon>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}
export default TodoItem
