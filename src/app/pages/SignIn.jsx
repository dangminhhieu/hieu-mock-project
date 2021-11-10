import { useHistory } from "react-router"
import { useState } from "react"
import useToast from "./../hooks/useToast"
import {
  Button,
  Image,
  Form,
  Grid,
  Container,
  Divider,
  Label,
  Icon,
  Header,
} from "semantic-ui-react"
import { login } from "../../api/shop.api"
import { useDispatch } from "react-redux"
import { logIn } from "../store/actions/auth-action"

const SignIn = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(true)
  const { toastSuccess, toastError } = useToast()
  const [phone, setPhone] = useState("")
  const dispatch = useDispatch()

  const signUp = () => {
    history.push("/sign-up")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = async () => {
    try {
      const res = await login(phone, isShop)

      toastSuccess("Log in successfully")

      if (isShop) {
        //login user
        dispatch(
          logIn({ id: res.shopId, phone: res.phoneNumber, isShop: isShop })
        )

        setTimeout(() => {
          history.push("/admin")
        }, 500)
      } else {
        //login user
        dispatch(
          logIn({
            id: res.customerId,
            phone: "",
            isShop: isShop,
            name: res.name,
          })
        )

        setTimeout(() => {
          history.push("/")
        }, 500)
      }
    } catch {
      toastError("Phone number is not exists")
    }
  }

  const label = isShop ? "Are you customer?" : "Are you shop owner?"

  return (
    <Container style={{ marginTop: "5%" }}>
      <Image src="/logo64.png" centered style={{ marginBottom: "10px" }} />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Container>
            <Form>
              <Form.Field>
                <Header as="h6" color="grey">
                  Phone Number
                </Header>
                <input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </Form.Field>
              <Button type="submit" color="grey" fluid onClick={submit}>
                Sign In
              </Button>
            </Form>
            <Divider />
            <Label as="a" style={{ width: "100%" }} onClick={toggleView}>
              <Icon name="question circle" /> {label}
            </Label>
            <Label
              as="a"
              basic
              color="grey"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={signUp}
            >
              <Icon name="user plus" /> Don't have account? Register now
            </Label>
          </Container>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default SignIn
