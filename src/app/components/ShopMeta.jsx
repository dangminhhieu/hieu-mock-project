import { Icon, Label } from "semantic-ui-react"
const ShopMeta = ({ title, label, link, icon }) => {
  return (
    <div className="shop-infor-field">
      <h5>{title}</h5>
      {link && (
        <Label
          color="black"
          size={"large"}
          as="a"
          href={link}
          style={{ width: "100%" }}
        >
          <Icon name={icon} />
          {label}
        </Label>
      )}
      {!link && (
        <Label color="black" size={"large"} style={{ width: "100%" }}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
    </div>
  )
}

export default ShopMeta
