import React, { useState, useEffect, lazy, Suspense } from "react";
import { Segment, Loader } from "semantic-ui-react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
const TopMenu = lazy(() => import("./components/TopMenu/TopMenu"));
const LeftMenu = lazy(() => import("./components/LeftMenu/LeftMenu"));
const Maps = lazy(() => import("./components/Map/Maps"));
const TopTenTable = lazy(() => import("./components/TopTenTable/TopTen"));
const Chart = lazy(() => import("./components/Chart"));

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
        <Suspense fallback={<Loader active />}>
          <TopMenu days={days} handleItemClick={handleSelectChange} />
        </Suspense>
        <Suspense fallback={<Loader active />}>
          <LeftMenu days={days} handleItemClick={handleSelectChange} />
        </Suspense>
        <div className="main-container">
          <Suspense fallback={<Loader active />}>
            <Route exact path="/" render={() => <Maps data={allRequests} />} />
            <Route
              exact
              path="/table"
              render={() => <TopTenTable features={allRequests} />}
            />
            <Route
              exact
              path="/chart"
              render={() => (
                <Segment style={{ marginBottom: "3em" }}>
                  <Chart features={allRequests} />
                </Segment>
              )}
            />
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
