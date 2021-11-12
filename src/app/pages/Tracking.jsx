import { useEffect } from "react"
import { useParams } from "react-router"
import { Header } from "semantic-ui-react"
import { getOrder } from "../../api/order.api"
import { TrackingHeader } from "../components/TrackingHeader"
import { TrackingItems } from "../components/TrackingList"
import useHttp from "../hooks/use-http"
const Tracking = () => {
  const { id: orderId } = useParams()
  const { data: order, sendRequest } = useHttp(getOrder, true)

  useEffect(() => {
    sendRequest(orderId)
  }, [])
  console.log("order",order)

  return (
    <>
      {order !== null &&<TrackingHeader information={order}></TrackingHeader>}
      {order !== null && <TrackingItems items={order.itemsInCart}></TrackingItems>}
    </>
  )
}

export default Tracking
