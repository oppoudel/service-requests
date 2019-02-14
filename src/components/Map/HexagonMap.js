import React, { useState } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { HexagonLayer } from 'deck.gl';
import './Map.css';
import { Segment } from 'semantic-ui-react';

const TOKEN =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const legendStyle = {
  position: 'absolute',
  zIndex: 500,
  top: 0,
  right: 0,
  background: 'white',
  margin: '1em',
  padding: '1em',
  width: '200px'
};

const INITIAL_VIEW_STATE = {
  latitude: 39.2895,
  longitude: -76.5815,
  zoom: 11,
  minZoom: 9,
  maxZoom: 19,
  pitch: 60,
  bearing: -27.396674584323023
};

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const colorRange = [
  [1, 152, 189, 52],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const colorRamp = colorRange.slice().map(color => `rgb(${color.join(',')})`);

export default function Map({ data }) {
  const [hoveredObject, setHoveredObject] = useState(null);
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);

  const _renderTooltip = () => {
    if (!hoveredObject) {
      return null;
    }

    const lat = hoveredObject.centroid[1];
    const lng = hoveredObject.centroid[0];
    const count = hoveredObject.points.length;

    return (
      <div className="tooltip" style={{ left: x, top: y }}>
        <div>{`latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}`}</div>
        <div>{`longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}`}</div>
        <div>{`${count} SRs`}</div>
      </div>
    );
  };
  const _renderLayers = () => {
    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage: 0.8,
        extruded: true,
        data,
        opacity: 0.8,
        radius: 150,
        getPosition: d => d.geometry.coordinates,
        upperPercentile: 99,
        pickable: true,
        elevationRange: [0, 10000],
        lightSettings: LIGHT_SETTINGS,
        elevationScale: 1,
        onHover: info => {
          setHoveredObject(info.object);
          setx(info.x);
          sety(info.y);
        }
      })
    ];
  };
  return (
    <Segment style={{ height: '502px', marginTop: '1em' }}>
      <DeckGL
        layers={_renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        width="100%"
        height="500px"
      >
        <StaticMap
          reuseMaps
          mapStyle="mapbox://styles/mapbox/dark-v9"
          preventStyleDiffing={true}
          mapboxApiAccessToken={TOKEN}
        />
      </DeckGL>
      {_renderTooltip()}
      <div style={legendStyle}>
        <div className="layout">
          {colorRamp.map((c, i) => (
            <div
              key={i}
              className="legend"
              style={{
                background: c,
                width: `${100 / colorRange.length}%`
              }}
            />
          ))}
        </div>
        <p className="layout">
          <span>Fewer SRs</span>
          <span style={{ textAlign: 'right' }}>More Srs</span>
        </p>
      </div>
    </Segment>
  );
}
