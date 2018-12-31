import React, { useState, useEffect } from "react";
import { Container, Segment, Grid } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopFive from "./components/TopFive";
import Map from "./components/Map";
import HexagonMap from "./components/HexagonMap";
import Chart from "./components/Chart";
import TopMenu from "./components/TopMenu/TopMenu";
import LeftMenu from "./components/LeftMenu/LeftMenu";

function App() {
  const [days, setDays] = useState(3);
  const today = new Date();
  const newDate = new Date(today.setDate(today.getDate() - days));
  const trimDate = newDate
    .toISOString()
    .substr(0, newDate.toISOString().indexOf("."));
  const urlExt =
    "&$where=createddate>'" + trimDate + "'&$order=createddate desc";
  const callsUrl = encodeURI(
    "https://data.baltimorecity.gov/resource/ni4d-8w7k.geojson?$limit=50000" +
      urlExt
  );

  const [allRequests, setAllRequests] = useState([]);

  useEffect(
    () => {
      fetch(callsUrl)
        .then(res => res.json())
        .then(data =>
          setAllRequests(data.features.filter(item => item.geometry))
        );
    },
    [days]
  );
  const handleSelectChange = value => {
    setDays(value);
  };
  return (
    <Router>
      <div>
        <TopMenu days={days} handleItemClick={handleSelectChange} />
        <LeftMenu days={days} handleItemClick={handleSelectChange} />
        <Container>
          <Route
            exact
            path="/"
            render={() => (
              <Grid columns={2} stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Segment style={{ height: "502px" }}>
                      <Map data={allRequests} />
                    </Segment>
                  </Grid.Column>

                  <Grid.Column>
                    <Segment style={{ height: "502px" }}>
                      <HexagonMap data={allRequests} />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
          />

          <Route
            path="/table"
            render={() => <TopFive features={allRequests} />}
          />
          <Route
            path="/chart"
            render={() => (
              <Segment style={{ marginBottom: "3em" }}>
                <Chart features={allRequests} />
              </Segment>
            )}
          />
        </Container>
      </div>
    </Router>
  );
}

export default App;
