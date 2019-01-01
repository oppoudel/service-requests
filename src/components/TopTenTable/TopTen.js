import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import { CSVLink } from "react-csv";
import "./TopTen.css";
import { reduceData } from "../../utils";

export default function TopTen({ features }) {
  const data = reduceData(features);

  return (
    <Fragment>
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
      <CSVLink
        data={data}
        filename={"serviceRequests.csv"}
        className="ui button btn"
        target="_blank"
      >
        Download Data
      </CSVLink>
    </Fragment>
  );
}
