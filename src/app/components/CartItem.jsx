import { Grid, Header, Icon, Label } from "semantic-ui-react"
import { formatCurrency } from "../helpers/number.helper"

const CartItem = ({ item, addToCart, removeFromCart }) => {
  const { itemName, price, amount, itemId } = item
  return (
    <Grid.Row>
      <Grid.Column width={8}>
        <Header size="tiny" className="cart-item-name" color="grey">
          {itemName}
        </Header>
      </Grid.Column>
      <Grid.Column width={1}>
        <Icon
          className="cart-minus"
          as="i"
          name="minus"
          color="grey"
          onClick={() => removeFromCart(itemId)}
        />
      </Grid.Column>
      <Grid.Column width={2}>
        <Label
          className="cart-quantity"
          style={{ width: "100%", padding: "0px 10px" }}
        >
          x{amount}
        </Label>
      </Grid.Column>
      <Grid.Column width={1}>
        <Icon
          className="cart-plus"
          as="i"
          name="plus"
          color="grey"
          onClick={() => addToCart(itemId)}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <Header size="tiny" className="cart-subtotal" color="grey">
          {formatCurrency(price * amount)}
        </Header>
      </Grid.Column>
    </Grid.Row>
  )
}

export default CartItem
