import { useEffect, useRef, useState } from "react"
import { Button, Image } from "semantic-ui-react"
import ModifyShopModal from "./ModifyShopModal"
import { useDispatch, useSelector } from "react-redux"
import { getShopsDetail, updateShopInfo } from "../../api/shop.api"
import useToast from "../hooks/useToast"
import ShopMeta from "./ShopMeta"
import { logOut } from "./../store/actions/auth-action"

const ShopSideBar = () => {
  const authInfo = useSelector(shop => shop.auth)
  const [shopData, setShop] = useState({})
  const { toastSuccess } = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    getShopsDetail(authInfo.id).then(res => {
      setShop(res)
    })
  }, [authInfo])

  const { image, name, phoneNumber } = shopData
  const modalRef = useRef(null)

  const viewShopProfile = id => {
    modalRef.current.open(id)
  }

  const share = () => {}

  const copy = () => {}

  const updateProfile = async data => {
    data.append("PhoneNumber", authInfo.phone)

    if (data.get("NewPhoneNumber") === authInfo.phone) {
      data.delete("NewPhoneNumber")
    }

    try {
      await updateShopInfo(data)
      toastSuccess("Update Shop Infomation Successfuly")
    } catch {}

    getShopsDetail(authInfo.id).then(res => {
      setShop(res)
    })
  }

  return (
    <>
      <ShopMeta icon="home" title="Name" label={name}></ShopMeta>
      <ShopMeta
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></ShopMeta>

      <Image
        src={`data:image/png;base64, ${image}`}
        fluid
        rounded
        style={{ marginTop: "10px" }}
      />

      <Button
        basic
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: "10px", width: "100%" }}
      />

      <Button
        basic
        content="Copy"
        labelPosition="left"
        icon="linkify"
        onClick={copy}
        color="brown"
        style={{ marginTop: "10px", width: "100%" }}
      />

      <Button
        basic
        content="Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: "10px", width: "100%" }}
      />

      <Button
        basic
        content="Sign Out"
        labelPosition="left"
        icon="sign-out"
        onClick={() => dispatch(logOut())}
        color="blue"
        style={{ marginTop: "10px", width: "100%" }}
      />

      <ModifyShopModal
        updateProfile={updateProfile}
        shopData={shopData}
        ref={modalRef}
      ></ModifyShopModal>
    </>
  )
}

export default ShopSideBar
