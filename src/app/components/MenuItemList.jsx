import { List } from "semantic-ui-react"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, editItem, addToCart, removeItem }) => {
  return (
    <List className="menu-item-list">
      {items.map(item => (
        <MenuItem
          key={item.itemId}
          item={item}
          editItem={editItem}
          addToCart={addToCart}
          removeItem={removeItem}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
