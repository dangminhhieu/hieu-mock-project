import { Button, Grid, Image, List, Segment } from "semantic-ui-react"
import { formatCurrency } from "../helpers/number.helper"

const MenuItem = ({ item, editItem, addToCart, removeItem }) => {
  const { image, name, price, itemId } = item
  return (
    <List.Item>
      <List.Content>
        <Segment className="menu-item">
          <Grid>
            <Grid.Column width={4}>
              <Image rounded src={`data:image/png;base64, ${image}`} />
            </Grid.Column>
            <Grid.Column width={12}>
              <List.Header as="h3">{name}</List.Header>
              <List.Header as="h2" style={{ marginTop: "15px" }}>
                {formatCurrency(price)}
              </List.Header>
              <div className="menu-item-actions">
                {editItem && (
                  <>
                    <Button
                      icon="pencil"
                      labelPosition="left"
                      content="Edit Item"
                      color="black"
                      onClick={() => editItem(itemId)}
                    />
                    <Button
                      icon="delete"
                      labelPosition="right"
                      content="Delete Item"
                      color="black"
                      onClick={() => removeItem(itemId)}
                    />
                  </>
                )}

                {addToCart && (
                  <Button
                    icon="cart plus"
                    labelPosition="right"
                    content="Add to Cart"
                    color="black"
                    onClick={() => addToCart(itemId)}
                  />
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </List.Content>
    </List.Item>
  )
}

export default MenuItem
