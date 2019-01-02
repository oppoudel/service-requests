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
            <Table.HeaderCell>Departments</Table.HeaderCell>
            <Table.HeaderCell>Total SRs</Table.HeaderCell>
            <Table.HeaderCell>Open SRs</Table.HeaderCell>
            <Table.HeaderCell>New SRs</Table.HeaderCell>
            <Table.HeaderCell>Not Closed SRs</Table.HeaderCell>
            <Table.HeaderCell>Closed SRs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({ Departments, TotalSr, NotClosed, Closed, Open, New }) => (
              <Table.Row key={Departments}>
                <Table.Cell>{Departments}</Table.Cell>
                <Table.Cell>{TotalSr}</Table.Cell>
                <Table.Cell>{Open}</Table.Cell>
                <Table.Cell>{New}</Table.Cell>
                <Table.Cell>{NotClosed}</Table.Cell>
                <Table.Cell>{Closed}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
      <CSVLink
        data={data}
        filename={"serviceRequests.csv"}
        className="ui button btn"
        target="_blank"
      >
        Download Table Data
      </CSVLink>
    </Fragment>
  );
}
