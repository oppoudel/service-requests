import React, { useState, useEffect } from "react";
import TopFive from "./components/TopFive";
import { Container, Select, Header, Segment } from "semantic-ui-react";
import Map from "./components/Map";

const selectOptions = [
  { key: 3, text: "Last 3 days", value: 3 },
  { key: 7, text: "Last 7 days", value: 7 },
  { key: 15, text: "Last 15 days", value: 15 },
  { key: 30, text: "Last 30 days", value: 30 }
];

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
  const handleSelectChange = (e, data) => {
    setDays(data.value);
  };
  return (
    <Container>
      <Header as="h5" style={{ margin: "10px" }}>
        Select the number of days
      </Header>
      <Select
        fluid
        placeholder="Select Number of Days"
        value={days}
        options={selectOptions}
        onChange={handleSelectChange}
      />
      <Segment style={{ height: "502px" }}>
        <Map data={allRequests} />
      </Segment>
      <TopFive features={allRequests} />
    </Container>
  );
}

export default App;
