import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"
import Layout from "./Layout"
import NotFound from "./pages/404"
import AdminOrders from "./pages/AdminOrders"
import AdminMenu from "./pages/AdminMenu"
import Shops from "./pages/Shops"
import Shop from "./pages/Shop"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Tracking from "./pages/Tracking"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/shop" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/orders" />
        </Route>
        <Layout exact path="/admin/orders" component={AdminOrders} />
        <Layout exact path="/admin/menu" component={AdminMenu} />
        <Layout exact path="/shop" component={Shops} />
        <Layout exact path="/shop/:id" component={Shop} />
        <Layout exact path="/tracking/:id" component={Tracking} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
