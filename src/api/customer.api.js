import { API_URL } from "../app/environments/environment"
import { sendPostRequest } from "./base.api"

export const registerCustomer = async formData => {
  return await sendPostRequest(`${API_URL}/Customer/register`, formData)
}
