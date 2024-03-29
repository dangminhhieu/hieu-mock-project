import { useEffect } from "react"
import { useParams } from "react-router"
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

  return (
    <>
      {order !== null &&<TrackingHeader information={order}></TrackingHeader>}
      {order !== null && <TrackingItems items={order.itemsInCart}></TrackingItems>}
    </>
  )
}

export default Tracking
