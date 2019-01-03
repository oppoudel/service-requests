import React, { useContext } from "react";
import { Grid, Segment } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Map from "./Map";
import HexagonMap from "./HexagonMap";

export default function Maps() {
  const data = useContext(AppContext);
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
