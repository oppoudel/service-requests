import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import Map from "./Map";
import HexagonMap from "./HexagonMap";

export default function Maps({ data }) {
  return (
    <Grid columns={2} stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment style={{ height: "502px" }}>
            <Map data={data} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment style={{ height: "502px" }}>
            <HexagonMap data={data} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
