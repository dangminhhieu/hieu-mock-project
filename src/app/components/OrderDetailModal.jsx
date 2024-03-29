import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Grid, Modal } from "semantic-ui-react"
import dayjs from "dayjs"
import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import OrderInforField from "./OrderInforField"
import { formatCurrency } from "../helpers/number.helper"

const priceRender = params => {
  return formatCurrency(params.value)
}

const renderNextStatusButton = status => {
  let color = null
  let label = ""

  switch (status) {
    case "Confirmed":
      color = "yellow"
      label = "Sent To Kitchen"
      break
    case "Sent To Kitchen":
      color = "blue"
      label = "Ready for Pickup"
      break
    case "Ready for Pickup":
      color = "teal"
      label = "Delivered"
      break
    case "Delivered":
      color = "green"
      label = "Complete Order"
      break
    default:
      color = "orange"
      label = "Confirmed"
      break
  }

  return { color, label }
}

const OrderDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState({})

  useImperativeHandle(ref, () => ({
    open(orderData) {
      setOrder(orderData)
      setIsOpen(true)
    },
  }))

  const columnDefs = useMemo(
    () => [
      { field: "itemName", minWidth: 100, headerName: "Name" },
      { field: "price", cellRenderer: priceRender },
      { field: "amount", headerName: "Quantity" },
      { field: "total" },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const {
    orderId,
    customerName,
    customerPhoneNumber,
    orderTime,
    itemsInCart,
    totalPrice,
    status,
    customerId,
    shopId,
  } = order
  const nextBtn = renderNextStatusButton(status)

  const changeOrderStatus = () => {
    const payload = {
      orderId,
      customerId,
      shopId,
      orderStatus: nextBtn.label,
    }

    props.updateOrderStatus(payload)
    setIsOpen(false)
  }

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="order-info">
            <Grid container>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Order No"
                  label={orderId}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={3}>
                <OrderInforField
                  title="Order Time"
                  label={dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Customer Name"
                  label={customerName}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Customer Phone"
                  label={customerPhoneNumber}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={5}>
                <OrderInforField
                  title="Total Price"
                  label={formatCurrency(totalPrice)}
                ></OrderInforField>
              </Grid.Column>
            </Grid>
          </div>
          <div
            className="order-items ag-theme-balham"
            style={{ height: 240 }}
          >
            <AgGridReact
              reactUi="true"
              className="ag-theme-balham"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowData={itemsInCart}
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        {status !== "Canceled" && status !== "Delivered" && (
          <Button
            content="Cancel Order"
            labelPosition="left"
            icon="close"
            onClick={() => setIsOpen(false)}
            color="grey"
          />
        )}
        {status !== "Canceled" && status !== "Delivered" && (
          <Button
            content={nextBtn.label}
            labelPosition="right"
            icon="checkmark"
            onClick={() => changeOrderStatus()}
            color={nextBtn.color}
          />
        )}
      </Modal.Actions>
    </Modal>
  )
})

export default OrderDetailModal
