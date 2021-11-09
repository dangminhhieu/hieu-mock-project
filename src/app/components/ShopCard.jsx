import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const shopCard = ({ shop }) => {
  const { image, name, shopId, brief, phoneNumber } = shop
  const link = `/shop/${shopId}`

  return (
    <Card>
      <Image src={`data:image/png;base64, ${image}`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={link}>{name}</Link>
        </Card.Header>
        <Card.Description>{brief}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone"></Icon> {phoneNumber}
      </Card.Content>
    </Card>
  )
}

export default shopCard
