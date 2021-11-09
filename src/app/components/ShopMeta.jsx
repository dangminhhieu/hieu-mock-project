import { Icon, Label } from "semantic-ui-react"
const ShopMeta = ({ title, label, link, icon }) => {
  return (
    <div className="info-field">
      <h5>{title}</h5>
      {link && (
        <Label size={"large"} as="a" href={link} style={{ width: "100%" }}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
      {!link && (
        <Label size={"large"} style={{ width: "100%" }}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
    </div>
  )
}

export default ShopMeta
