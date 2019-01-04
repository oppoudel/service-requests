import React, { useContext } from "react";
import { Grid, Segment } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Map from "./Map";
import HexagonMap from "./HexagonMap";
import Details from "../Details/Details";

export default function Maps() {
  const data = useContext(AppContext);
  const total = data.length;
  const closed = data.filter(item => item.properties.srstatus === "Closed")
    .length;
  const notclosed = data.filter(item => item.properties.srstatus !== "Closed")
    .length;
  return (
    <div>
      <Details total={total} closed={closed} notclosed={notclosed} />
      <Grid stackable>
        <Grid.Row columns={2}>
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
    </div>
  );
}
