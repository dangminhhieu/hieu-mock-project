import { Button, Icon } from "semantic-ui-react"

const ActionCellRenderer = props => {
  const { onViewOrder, node } = props

  return (
    <Button
      icon
      labelPosition="left"
      color="blue"
      size="mini"
      onClick={() => onViewOrder(node.data)}
      title="View Order"
    >
      <Icon name="eye" />
      View Order
    </Button>
  )
}

export default ActionCellRenderer
