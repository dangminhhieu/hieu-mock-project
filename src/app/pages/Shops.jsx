import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getShops } from "../../api/shop.api"
import ShopList from "../components/ShopList"

const DashboardGuest = () => {
  const [shops, setshops] = useState([])
  const authInfo = useSelector(state => state.auth)
  const history = useHistory()

  //load shop
  useEffect(() => {
    if (!authInfo.id) {
      history.push("/sign-in")
    }
    const fetchshops = async () => {
      try {
        const res = await getShops()
        setshops(res)
      } catch {}
    }

    fetchshops()
  }, [authInfo])

  return (
    <>
      <div className="shop-search"></div>
      <div className="shop-list">
        {shops && <ShopList shops={shops}></ShopList>}
      </div>
    </>
  )
}

export default DashboardGuest
