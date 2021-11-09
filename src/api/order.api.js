import { API_URL } from "../app/environments/environment"
import { sendGetRequest, sendPutRequest } from "./base.api"

export const getShopOrders = async shopId => {
  return await sendGetRequest(`${API_URL}/Order/${shopId}/shop/all`)
}

export const updateOrderStatus = async data => {
  return await sendPutRequest(`${API_URL}/Order/status`, JSON.stringify(data), {
    "Content-Type": "application/json",
  })
}
export const getOrder = async cartId => {
  return await sendGetRequest(`${API_URL}/Order/${cartId}`)
}
