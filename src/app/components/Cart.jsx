import { Button, Header, Label, Segment } from "semantic-ui-react"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency } from "../helpers/number.helper"

const Cart = ({
  cart,
  submitCart,
  addToCart,
  removeFromCart,
  loading,
  deliveryInfo,
  handleChangeDelivery,
}) => {
  const { groups, total } = cart

  return (
    <>
      <Segment>
        <Header>
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(total || 0)}
          </Label>
        </Header>

        <Button
          content="Submit"
          labelPosition="left"
          icon="send"
          color="grey"
          style={{ marginTop: 15, width: "100%" }}
          onClick={submitCart}
          loading={loading}
          disabled={loading}
        />
      </Segment>

      {groups &&
        Object.keys(groups).map(k => (
          <CartItemGroup
            key={k}
            group={groups[k]}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            deliveryInfo={deliveryInfo}
            handleChangeDelivery={handleChangeDelivery}
          ></CartItemGroup>
        ))}
    </>
  )
}

export default Cart
