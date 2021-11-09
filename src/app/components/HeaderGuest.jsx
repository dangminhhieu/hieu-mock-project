import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"
import { logOut } from "../store/actions/auth-action"

const HeaderGuest = () => {
  const history = useHistory()
  const [activeItem] = useState(null)
  const dispatch = useDispatch()

  return (
    <Menu className="header" pointing secondary widths={5}>
      <Menu.Item></Menu.Item>
      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/profile")}
      >
        <Icon size={"small"} name="user" /> Profile
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/shop")}>
        <Image src="/logo/logo32.png" />
      </Menu.Item>
      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => dispatch(logOut())}
      >
        <Icon
          size={"small"}
          name="log out"
          onClick={() => dispatch(logOut())}
        />{" "}
        Sign Out
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  )
}

export default HeaderGuest
