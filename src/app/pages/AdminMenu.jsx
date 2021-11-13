import MenuItemList from "../components/MenuItemList"
import SectionHeader from "../components/SectionHeader"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useHttp from "../hooks/use-http"
import { addShopItem, getShopsDetail, removeShopItem, updateShopItem } from "../../api/shop.api"
import useToast from "../hooks/useToast"
import { useHistory } from "react-router"
import SecondaryNavBar from "../components/SecondaryNavBar"
import MenuItemModal from "../components/MenuItemModal"
import { Grid } from "semantic-ui-react"
import ShopSideBar from "./../components/ShopSideBar"

const AdminMenu = () => {
  const [menuItems, setMenu] = useState([])
  const modalRef = useRef(null)
  const authInfo = useSelector(state => state.auth)
  const { status, data, sendRequest } = useHttp(getShopsDetail, true)
  const { toastSuccess } = useToast()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authInfo.isShop) {
      history.push("/sign-in")
    }
    reloadMenu()
  }, [authInfo])

  useEffect(() => {
    if (status === "completed") {
      setMenu(data.items)
    }
  }, [status, data])

  const editItem = id => {
    const item = menuItems.find(i => i.itemId === id)

    modalRef.current.open(item)
  }
  const removeItem = id => {
    const item = menuItems.find(i => i.itemId === id)
    
    dispatch(removeShopItem({ shopId: item.shopId, itemId: item.itemId }))
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
  console.log(data)

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
            <MenuItemList items={menuItems} editItem={editItem} removeItem = {removeItem}></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <ShopSideBar ></ShopSideBar>
        </Grid.Column>
      </Grid>

      <MenuItemModal ref={modalRef} onSaveItem={saveItem}></MenuItemModal>
    </>
  )
}

export default AdminMenu
