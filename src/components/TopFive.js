import React from "react";
import { Table } from "semantic-ui-react";
import { reduceData } from "../utils";

export default function TopFive({ features }) {
  const data = reduceData(features);

  return (
    <Table striped style={{ marginTop: "10px" }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Total SR</Table.HeaderCell>
          <Table.HeaderCell>Not Closed SR</Table.HeaderCell>
          <Table.HeaderCell>Closed SR</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ Name, TotalSr, NotClosed, Closed }) => (
          <Table.Row key={Name}>
            <Table.Cell>{Name}</Table.Cell>
            <Table.Cell>{TotalSr}</Table.Cell>
            <Table.Cell>{NotClosed}</Table.Cell>
            <Table.Cell>{Closed}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
