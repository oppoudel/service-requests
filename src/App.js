import tag from '@turf/tag';
import NProgress from 'nprogress';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Header } from 'semantic-ui-react';
import './App.css';
import AppContext from './AppContext';
import { VRI } from './data/VRI_Zones';
const TopMenu = lazy(() => import('./components/TopMenu/TopMenu'));
const LeftMenu = lazy(() => import('./components/LeftMenu/LeftMenu'));
const Maps = lazy(() => import('./components/Map/Maps'));
const TopTenTable = lazy(() => import('./components/TopTenTable/TopTen'));
const Charts = lazy(() => import('./components/Charts/Charts'));

function App() {
  const [days, setDays] = useState(3);
  const today = new Date();
  const newDate = new Date(today.setDate(today.getDate() - days));
  const trimDate = newDate
    .toISOString()
    .substr(0, newDate.toISOString().indexOf('.'));
  const urlExt =
    "&$where=createddate>'" + trimDate + "'&$order=createddate desc";
  const callsUrl = encodeURI(
    'https://data.baltimorecity.gov/resource/ni4d-8w7k.geojson?$limit=50000' +
      urlExt
  );
  const [initData, setInitData] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [selectVRI, setSelectVRI] = useState([]);

  useEffect(() => {
    NProgress.start();
    fetch(callsUrl)
      .then(res => res.json())
      .then(data => {
        const points = {
          ...data,
          features: data.features.filter(item => item.geometry)
        };
        const polygons = VRI;
        const updatedData = tag(points, polygons, 'Name', 'VRI');
        setInitData(updatedData.features);
        setAllRequests(updatedData.features);
        setSelectVRI([]);
        NProgress.done();
      });
  }, [days]);
  const handleSelectChange = value => {
    setDays(value);
  };
  console.log(allRequests);
  useEffect(() => {
    let updatedData = initData;
    if (selectVRI.length >= 1) {
      updatedData = updatedData.reduce((acc, item) => {
        selectVRI.forEach(sel => {
          if (item.properties.VRI === sel) {
            acc.push(item);
          }
        });
        return acc;
      }, []);
    }
    setAllRequests(updatedData);
  }, [selectVRI, days]);
  return (
    <Router>
      <div>
        <Suspense fallback={<Loader active />}>
          <TopMenu days={days} handleItemClick={handleSelectChange} />
        </Suspense>
        <Suspense fallback={<Loader active />}>
          <LeftMenu
            days={days}
            handleItemClick={handleSelectChange}
            selected={selectVRI}
            setVRISelection={setSelectVRI}
          />
        </Suspense>
        <AppContext.Provider value={allRequests}>
          <div className="main-container">
            <Suspense fallback={<Loader active />}>
              <Switch>
                <Route exact path="/">
                  <Maps />
                </Route>
                <Route exact path="/table">
                  <TopTenTable />
                </Route>
                <Route exact path="/chart">
                  <Charts />
                </Route>
                <Route>
                  <Header as="h3" style={{ textAlign: 'center' }}>
                    Not Found!
                  </Header>
                </Route>
              </Switch>
            </Suspense>
          </div>
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
