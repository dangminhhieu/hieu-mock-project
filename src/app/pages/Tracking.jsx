import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router"
import { Header } from "semantic-ui-react"
import { getOrder } from "../../api/order.api"
import useHttp from "../hooks/use-http"
const Tracking = () => {
  const { id: cartId } = useParams()
  const { data: order, sendRequest } = useHttp(getOrder, true)
  useEffect(() => {
    sendRequest(cartId)
  }, [cartId])
  console.log(order)
  return (
    <>
      <Header size="medium">Order Status Tracking (realtime) </Header>
    </>
  )
}

export default Tracking
