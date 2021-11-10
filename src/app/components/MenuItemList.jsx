import { List } from "semantic-ui-react"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, editItem, addToCart }) => {
  return (
    <List className="menu-item-list">
      {items.map(item => (
        <MenuItem
          key={item.itemId}
          item={item}
          editItem={editItem}
          addToCart={addToCart}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
