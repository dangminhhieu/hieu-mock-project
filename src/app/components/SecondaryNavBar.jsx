import { Icon, Menu, Segment } from "semantic-ui-react"
import { useState } from "react"
import { useHistory, useRouteMatch } from "react-router"

const SecondaryNavBar = () => {
  const history = useHistory()
  const route = useRouteMatch()
  const [activeMenu, setItem] = useState(
    route.path === "/admin/orders" ? "orders" : "menu"
  )

  const handleChangeMenu = (name, router) => {
    if (activeMenu === name) return
    setItem(name)
    history.push(router)
  }

  return (
    <Segment inverted style={{ paddingTop: "5px" }}>
      <Menu inverted pointing secondary>
        <Menu.Item
          name="orders"
          active={activeMenu === "orders"}
          onClick={(e, { name }) => handleChangeMenu(name, "/admin/orders")}
        >
          <Icon name="list" /> Orders
        </Menu.Item>

        <Menu.Item
          name="menu"
          active={activeMenu === "menu"}
          onClick={(e, { name }) => handleChangeMenu(name, "/admin/menu")}
        >
          <Icon name="list alternate outline" /> Menu
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default SecondaryNavBar
