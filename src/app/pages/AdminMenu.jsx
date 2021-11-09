import MenuItemList from "../components/MenuItemList"
import SectionHeader from "../components/SectionHeader"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useHttp from "../hooks/use-http"
import { addShopItem, getShopsDetail, updateShopItem } from "../../api/shop.api"
import useToast from "../hooks/useToast"
import { useHistory } from "react-router"
import SecondaryNavBar from "../components/SecondaryNavBar"
import MenuDetailModal from "../components/MenuDetailModal"
import { Grid } from "semantic-ui-react"
import ShopSideBar from "./../components/ShopSideBar"

const AdminMenu = () => {
  const [menuItems, setMenu] = useState([])
  const modalRef = useRef(null)
  const authInfo = useSelector(state => state.auth)
  const { status, data, sendRequest } = useHttp(getShopsDetail, true)
  const { toastSuccess } = useToast()
  const history = useHistory()

  useEffect(() => {
    console.log(authInfo)
    if (!authInfo.isShop) {
      history.push("/sign-in")
    }
    console.log(authInfo)
    reloadMenu()
  }, [authInfo])

  useEffect(() => {
    if (status === "completed") {
      setMenu(data.items)
    }
  }, [status, data])

  const viewOrder = id => {
    const item = menuItems.find(i => i.itemId === id)

    modalRef.current.open(item)
  }

  const addItem = () => {
    modalRef.current.open()
  }

  const saveItem = async data => {
    data.append("ShopId", authInfo.id)

    try {
      if (!data.get("ItemId")) {
        await addShopItem(data)
        toastSuccess("Create Item successfully")
      } else {
        await updateShopItem(data)
        toastSuccess("Update Item successfully")
      }
    } catch {}

    sendRequest(authInfo.id)
  }

  const reloadMenu = () => {
    sendRequest(authInfo.id)
  }

  return (
    <>
      <Grid>
        <Grid.Column width={12}>
          <SecondaryNavBar />
          <SectionHeader
            title="View Menu"
            addItem={() => addItem()}
          ></SectionHeader>
          {menuItems && (
            <MenuItemList
              items={menuItems}
              viewOrder={viewOrder}
            ></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <ShopSideBar></ShopSideBar>
        </Grid.Column>
      </Grid>

      <MenuDetailModal ref={modalRef} onSaveItem={saveItem}></MenuDetailModal>
    </>
  )
}

export default AdminMenu
