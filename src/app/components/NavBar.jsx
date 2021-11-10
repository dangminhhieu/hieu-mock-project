import { useHistory } from "react-router"
import { Image, Menu } from "semantic-ui-react"

const NavBar = () => {
  const history = useHistory()

  return (
    <Menu inverted text size={"small"} widths={9}>
      <Menu.Item onClick={() => history.push("/shop")}>
        <Image src="/logo32.png" />
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
