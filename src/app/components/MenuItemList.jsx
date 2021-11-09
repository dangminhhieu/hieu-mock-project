import { List } from "semantic-ui-react"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, viewOrder, addToCart }) => {
  return (
    <List className="menu-item-list" size={"large"}>
      {items.map(item => (
        <MenuItem
          key={item.itemId}
          item={item}
          viewOrder={viewOrder}
          addToCart={addToCart}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
