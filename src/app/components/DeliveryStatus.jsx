import { Stepper, Step, StepLabel } from "@mui/material"
import { useEffect, useState } from "react"

const DeliveryStatus = props => {
  const steps = [
    "Confirmed",
    "Sent To Kitchen",
    "Ready for Pickup",
    "Ready for Delivery",
    "Delivered",
  ]
  const status = props.status;
  const stepsCancel = ["Confirmed", "Cancelled"]
  const [listSteps, setListSteps] = useState([])
  

  useEffect(() => {
    innit()
  }, [])
  const innit = () => {
  if (status === "Cancelled") {
    setListSteps(stepsCancel)
    
  } else {
    setListSteps(steps)
    
  }}

  return (
    <Stepper activeStep={listSteps.indexOf(status) + 1} alternativeLabel>
    {listSteps.map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
  )
}
export default DeliveryStatus
