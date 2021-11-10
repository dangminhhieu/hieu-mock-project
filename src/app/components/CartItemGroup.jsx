import {
  Container,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment,
} from "semantic-ui-react"
import CartItem from "./CartItem"

const CartItemGroup = ({
  group,
  addToCart,
  removeFromCart,
  deliveryInfo,
  handleChangeDelivery,
}) => {
  const { name, items } = group
  return (
    <Segment>
      <Label
        basic
        content={name}
        icon="shopping cart"
        color="black"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <Form inline>
        <Form.Field>
          <label>Delivery</label>
          <Input
            placeholder="Delivery"
            value={deliveryInfo}
            onChange={handleChangeDelivery}
          />
        </Form.Field>
      </Form>
      <Header size={"small"} color="grey"></Header>
      <Container>
        <Grid>
          {items &&
            items.map(item => (
              <CartItem
                key={item.itemId}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              ></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
