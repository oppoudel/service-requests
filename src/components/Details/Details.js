import React from "react";
import { Card } from "semantic-ui-react";

export default function Details({ total, notclosed, closed }) {
  return (
    <Card.Group itemsPerRow={3}>
      <Card color="black">
        <Card.Content>
          <strong>Number of Total Srs : {total}</strong>
        </Card.Content>
      </Card>
      <Card color="red">
        <Card.Content>
          <strong>Number of Closed Srs : {closed}</strong>
        </Card.Content>
      </Card>
      <Card color="blue">
        <Card.Content>
          <strong>Number of Not Closed Srs : {notclosed}</strong>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
