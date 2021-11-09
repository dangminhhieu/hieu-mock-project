import { API_URL } from "../app/environments/environment"
import { sendGetRequest, sendPostRequest, sendPutRequest } from "./base.api"

export const login = async (phoneNumber, isShop = true) => {
  const url = `${API_URL}/${isShop ? "Shop" : "Customer"}/login`

  console.log(url)
  return await sendPostRequest(url, JSON.stringify({ phoneNumber }), {
    "Content-Type": "application/json",
  })
}

export const registerShop = async formData => {
  return await sendPostRequest(`${API_URL}/Shop/register`, formData)
}

export const getShops = async () => {
  return await sendGetRequest(`${API_URL}/Shop/all`)
}

export const getShopsDetail = async id => {
  return await sendGetRequest(`${API_URL}/Shop/${id}`)
}

export const addShopItem = async formData => {
  return await sendPostRequest(`${API_URL}/Item/create`, formData)
}

export const updateShopItem = async formData => {
  return await sendPutRequest(`${API_URL}/Item`, formData)
}

export const updateShopInfo = async formData => {
  return await sendPutRequest(`${API_URL}/Shop`, formData)
}
