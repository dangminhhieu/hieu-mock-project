import { Route } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import NavBar from "./components/NavBar"

const Layout = ({ component: Component, ...rest }) => {
  console.log("rest", rest)

  return (
    <Route
      {...rest}
      render={props => {
        console.log("props", props)
        return (
          <>
            <NavBar></NavBar>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Component {...props} />
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </>
        )
      }}
    />
  )
}

export default Layout
