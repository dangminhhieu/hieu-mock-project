import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { TrackingItem } from "./TrackingItem.jsx";
import { formatter } from "../helpers/common.helper";

export const TrackingItems = (props) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    initData();
   
  }, [props.items]);

  const initData = () => {
    setItems(props.items)
    const newTotal = props.items.reduce((total, item, index, items) => {
        return  total += item.price * item.amount
    },0)
    setTotal(newTotal)
  }

  const listItems = items.map((item,index) => (
    <TrackingItem
      key={item.itemId}
      item={item}
      index={index}
    />
  ));

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Qty/Sub</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {listItems}

        <Table.Row >
            <Table.Cell  colspan="3"></Table.Cell>
            <Table.Cell>
            Total: {formatter.format(total)}
            </Table.Cell>
          </Table.Row>

      </Table>
      <br></br>
    </>
  );
};