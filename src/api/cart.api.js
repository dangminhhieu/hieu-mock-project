import { API_URL } from "../app/environments/environment"
import { sendPostRequest } from "./base.api"

export const createNewCart = async (customerId, shopId) => {
  return await sendPostRequest(
    `${API_URL}/Cart/create`,
    JSON.stringify({ customerId, shopId }),
    { "Content-Type": "application/json" }
  )
}

export const getCurrentShopCart = async (customerId, shopId) => {
  return await sendPostRequest(
    `${API_URL}/Cart/exist/shop/customer`,
    JSON.stringify({ customerId, shopId }),
    { "Content-Type": "application/json" }
  )
}

export const addCartItem = async data => {
  return await sendPostRequest(
    `${API_URL}/Cart/add/item`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}

export const removeCartItem = async data => {
  return await sendPostRequest(
    `${API_URL}/Cart/remove/item`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}

export const submitCart = async data => {
  return await sendPostRequest(`${API_URL}/Cart/submit`, JSON.stringify(data), {
    "Content-Type": "application/json",
  })
}

export const placeOrder = async data => {
  return await sendPostRequest(`${API_URL}/Order`, JSON.stringify(data), {
    "Content-Type": "application/json",
  })
}
