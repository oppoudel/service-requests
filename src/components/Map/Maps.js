import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import AppContext from "../../AppContext";
import Details from "../Details/Details";
import HexagonMap from "./HexagonMap";
import Map from "./Map";

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
            <Map data={data} />
          </Grid.Column>
          <Grid.Column>
            <HexagonMap data={data} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
