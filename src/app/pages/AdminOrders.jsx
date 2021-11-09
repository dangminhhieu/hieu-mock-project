import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import SectionHeader from "../components/SectionHeader"
import { useSelector } from "react-redux"
import { getShopOrders, updateOrderStatus } from "../../api/order.api"
import { formatCurrency } from "../helpers/number.helper"
import dayjs from "dayjs"
import { useHistory } from "react-router"
import SecondaryNavBar from "../components/SecondaryNavBar"
import ActionCellRenderer from "../components/AdminOrders/ActionCellRenderer"
import OrderDetailModal from "../components/OrderDetailModal"
import { Grid } from "semantic-ui-react"
import ShopSideBar from "./../components/ShopSideBar"

const priceRender = params => {
  return formatCurrency(params.value)
}

const AdminOrders = () => {
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: "customerName" },
      { field: "customerPhoneNumber", headerName: "Customer Phone" },
      { field: "totalPrice", cellRenderer: priceRender },
      { field: "status" },
      {
        field: "orderTime",
        sort: "desc",
        cellRenderer: params => dayjs(params.value).format("MM/DD/YYYY HH:mm"),
      },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: data => viewOrder(data),
        },
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  // changes, needs to be state
  const [rowData, setRow] = useState([])
  const authInfo = useSelector(shop => shop.auth)
  const history = useHistory()

  useEffect(() => {
    console.log(authInfo)
    if (!authInfo.isShop) {
      history.push("/sign-in")
    }
    getShopOrders(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }, [authInfo])

  const modalRef = useRef(null)

  const viewOrder = data => {
    if (!data) return
    ;(data.itemsInCart || []).forEach(i => {
      i.total = formatCurrency(i.price * i.amount)
    })
    modalRef.current.open(data)
  }

  const handleUpdateOrderStatus = async data => {
    await updateOrderStatus(data)
    getShopOrders(authInfo.id).then(res => {
      setRow(res.orders)
    })
  }

  return (
    <>
      <Grid>
        <Grid.Column width={12}>
          <SecondaryNavBar />
          <SectionHeader title="View Orders"></SectionHeader>
          <div className="ag-theme-material order-grid">
            <AgGridReact
              reactUi="true"
              className="ag-theme-material"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowData={rowData}
              frameworkComponents={{
                actionCellRenderer: ActionCellRenderer,
              }}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <ShopSideBar></ShopSideBar>
        </Grid.Column>
      </Grid>

      <OrderDetailModal
        updateOrderStatus={handleUpdateOrderStatus}
        ref={modalRef}
      ></OrderDetailModal>
    </>
  )
}

export default AdminOrders
