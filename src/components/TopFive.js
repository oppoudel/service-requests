import React from "react";
import { Table } from "semantic-ui-react";
import { groupBy, map } from "lodash";

export default function TopFive({ features }) {
  const byAgency = groupBy(features, item => item.properties.agency);
  const topTenAgency = Object.keys(byAgency)
    .sort((a, b) => byAgency[b].length - byAgency[a].length)
    .slice(0, 10);
  const isOpen = f => f.properties.srstatus === "Open";
  const isNew = f => f.properties.srstatus === "New";
  const data = topTenAgency.reduce((arr, item) => {
    arr.push({
      Name: item,
      TotalSr: byAgency[item].length,
      Open: byAgency[item].filter(isOpen).length,
      New: byAgency[item].filter(isNew).length
    });
    return arr;
  }, []);

  return (
    <Table striped style={{ marginTop: "10px" }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Total SR</Table.HeaderCell>
          <Table.HeaderCell>Open SR</Table.HeaderCell>
          <Table.HeaderCell>New SR</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(data, ({ Name, TotalSr, Open, New }) => (
          <Table.Row key={Name}>
            <Table.Cell>{Name}</Table.Cell>
            <Table.Cell>{TotalSr}</Table.Cell>
            <Table.Cell>{Open}</Table.Cell>
            <Table.Cell>{New}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
