import React, { useState } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { ScatterplotLayer } from "deck.gl";
import { format } from "date-fns";
import { Segment, Header } from "semantic-ui-react";

const legendStyle = {
  position: "absolute",
  zIndex: 500,
  top: 0,
  right: 0,
  background: "white",
  margin: "1em",
  padding: "1em"
};

const legendDotStyle = {
  width: "12px",
  height: "12px",
  background: "rgb(0, 128, 255)",
  display: "inline-block",
  marginLeft: "5px",
  borderRadius: "50%"
};

const TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const OPEN_COLOR = [0, 128, 255];
const CLOSED_COLOR = [255, 0, 128];

const INITIAL_VIEW_STATE = {
  latitude: 39.2895,
  longitude: -76.5815,
  zoom: 11,
  minZoom: 9,
  maxZoom: 19
};

export default function Map({ data }) {
  const [hoveredObject, setHoveredObject] = useState(null);
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);

  const _renderTooltip = () => {
    if (!hoveredObject) {
      return null;
    }
    const { address, srtype, agency, createddate } = hoveredObject.properties;
    return (
      <div className="tooltip" style={{ left: x, top: y }}>
        <div>{`Address: ${address}`}</div>
        <div>{`Agency: ${agency}`}</div>
        <div>{`SR Type: ${srtype}`}</div>
        <div>{`Created Date: ${format(createddate, "MM/DD/YYYY HH:MM")}`}</div>
      </div>
    );
  };

  const _renderLayers = () => {
    return [
      new ScatterplotLayer({
        id: "geojson",
        data,
        opacity: 0.8,
        radiusScale: 6,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,
        getPosition: d => d.geometry.coordinates,
        pickable: true,
        getRadius: 1,
        getColor: d =>
          d.properties.srstatus === "Closed" ? CLOSED_COLOR : OPEN_COLOR,
        onHover: info => {
          setHoveredObject(info.object);
          setx(info.x);
          sety(info.y);
        }
      })
    ];
  };

  return (
    <Segment style={{ height: "502px", marginTop: "1em" }}>
      <DeckGL
        layers={_renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        width="100%"
        height="500px"
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxApiAccessToken={TOKEN}
          reuseMaps
          preventStyleDiffing={true}
        />
        {_renderTooltip()}
      </DeckGL>
      <div style={legendStyle}>
        <p>
          Not Closed: <span style={legendDotStyle} />
        </p>
        <p>
          Closed Srs:{" "}
          <span style={{ ...legendDotStyle, background: "rgb(255, 0, 128)" }} />
        </p>
      </div>
    </Segment>
  );
}
