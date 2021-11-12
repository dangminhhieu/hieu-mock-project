import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import DeliveryStatus from "./DeliveryStatus";


export const TrackingHeader = (props) => {

    const [information, setInfomation] = useState({
        shopName: '',
        phoneNumberOfShop: '',
        status: ''
    })
    useEffect(() => {
        initData();
       
      }, [props.information]);
    
      const initData = () => {
        setInfomation({
            shopName: props.information.shopName,
            phoneNumberOfShop: props.information.phoneNumberOfShop,
            status: props.information.status
        })
      }
  return (
      <>
          <h2>Order Status Tracking (realtime)</h2>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Grid style={{width: '50%'}}>
            <Grid.Row></Grid.Row>
            <Grid.Row>
            <Grid.Column>
              <Segment>Shop Name: { information.shopName}</Segment>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
               <Segment>phone number: { information.phoneNumberOfShop}</Segment>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
                <DeliveryStatus status={information.status}></DeliveryStatus>
            </Grid.Column>
            </Grid.Row>
        </Grid>
         

          </div>
     
      
    </>
  );
};