import { useHistory, useParams } from "react-router"
import { useEffect, useState } from "react"
import MenuItemList from "../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import useHttp from "../hooks/use-http"
import { getShopsDetail } from "../../api/shop.api"
import useToast from "../hooks/useToast"
import { Link } from "react-router-dom";
import { createNewCart, getCurrentShopCart, placeOrder, submitCart } from "../../api/cart.api"
import { deepClone } from "../helpers/common.helper"

const Shop = () => {
  const { id: shopId } = useParams()
  const [cart, setCart] = useState({ groups: {}, subtotal: 0, discount: 0, total: 0 })
  const [deliveryInfo, setDelivery] = useState("");
  const authInfo = useSelector(state => state.auth);
  const { data: menuInfo, sendRequest } = useHttp(getShopsDetail, true);
  const { data: cartInfo, sendRequest: loadCurrentShopCart, status: loadCartStatus } = useHttp(getCurrentShopCart, true);
  const { toastSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  useEffect(() => {
    if(!authInfo.id){
      history.push("/sign-in")
    }
    sendRequest(shopId);
    loadCurrentShopCart(authInfo.id, shopId);
    const shopdCart = sessionStorage.getItem(`cart_${authInfo.id}_${shopId}`);
    console.log(shopdCart)
    if (shopdCart) {
      setCart(JSON.parse(shopdCart));
    }
  }, []);

  useEffect(() => {
    if (loadCartStatus === "completed" && !cartInfo) {
      createNewCart(authInfo.id, shopId).then(() => {
        //reload cart
        loadCurrentShopCart(authInfo.id, shopId);
      });
    }
  }, [loadCartStatus, authInfo.id, shopId, cartInfo, loadCurrentShopCart]);

  const addToCart = async id => {
    const findMenu = menuInfo.items.find(i => i.itemId === id);
    const menu = deepClone(findMenu);
    delete menu.image;
    const newCart = deepClone(cart);
    if (!newCart.groups[authInfo.id]) {
      newCart.groups[authInfo.id] = { name: authInfo.name, items: [{ ...menu, itemName: menu.name, amount: 1 }] }
    } else {
      const { items } = newCart.groups[authInfo.id];
      const found = items.find(i => i.itemId === menu.itemId);
      console.log(found);
      if (found) {
        found.amount++;
      } else {
        items.push({ ...menu, itemName: menu.name, amount: 1 });
      }
    }

    newCart.subtotal += menu.price;
    newCart.total = newCart.subtotal - (newCart.subtotal * newCart.discount / 100);
    setCart(newCart);
    sessionStorage.setItem(`cart_${authInfo.id}_${shopId}`, JSON.stringify(newCart));
  }

  const removeFromCart = async id => {
    const newCart = deepClone(cart);
    const { items } = newCart.groups[authInfo.id];
    const found = items.find(i => i.itemId === id);
    found.amount--;
    if (found.amount === 0) {
      newCart.groups[authInfo.id].items = items.filter(i => i.itemId !== id);
    }

    setCart(newCart);
    sessionStorage.setItem(`cart_${authInfo.id}_${shopId}`, JSON.stringify(newCart));
  }

  const handleSubmitCart = async () => {
    //build data submit
    const { items } = cart.groups[authInfo.id] || {};
    if (!items || items.length === 0) {
      return;
    }
    console.log(cartInfo)

    setLoading(true);
    const payload = {
      customerId: authInfo.id,
      cartId: cartInfo.cartId,
      items: []
    };

    items.forEach(i => {
      payload.items.push({ amount: i.amount, itemId: i.itemId, isDeleted: false });
    })

    await submitCart(payload);
    await placeOrder({ cartId: cartInfo.cartId, deliveryInformation: deliveryInfo });
    sessionStorage.removeItem(`cart_${authInfo.id}_${shopId}`);
    setCart({ groups: {}, subtotal: 0, discount: 0, total: 0 });
    toastSuccess("Placed order successfully");

    //create new cartId
    loadCurrentShopCart(authInfo.id, shopId);
    setLoading(false);
  }

  const handleChangeDelivery = e => {
    setDelivery(e.target.value);
  }

  return (
    <>
      <Header size="medium"><Link to="/">Shop</Link> &gt; {(menuInfo || {}).name}</Header>
      <Grid>
        <Grid.Column width={12}>
          {(menuInfo || {}).items && (
            <MenuItemList items={menuInfo.items} addToCart={addToCart}></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Cart
            cart={cart}
            loading={loading}
            deliveryInfo={deliveryInfo}
            submitCart={handleSubmitCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            handleChangeDelivery={handleChangeDelivery}
          ></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Shop
