import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { ScatterplotLayer } from "deck.gl";

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

export default class Map extends Component {
  state = {
    hoveredObject: null
  };

  _renderTooltip = () => {
    const { x, y, hoveredObject } = this.state;

    if (!hoveredObject) {
      return null;
    }

    const { address, srtype, agency } = hoveredObject.properties;
    return (
      <div className="tooltip" style={{ left: x, top: y }}>
        <div>{`Address: ${address}`}</div>
        <div>{`Agency: ${agency}`}</div>
        <div>{`SR Type: ${srtype}`}</div>
      </div>
    );
  };

  _renderLayers() {
    const { data } = this.props;
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
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            x: info.x,
            y: info.y
          })
      })
    ];
  }
  render() {
    return (
      <div>
        <DeckGL
          layers={this._renderLayers()}
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
          {this._renderTooltip()}
        </DeckGL>
        <div style={legendStyle}>
          <p>
            Not Closed: <span style={legendDotStyle} />
          </p>
          <p>
            Closed Srs:{" "}
            <span
              style={{ ...legendDotStyle, background: "rgb(255, 0, 128)" }}
            />
          </p>
        </div>
      </div>
    );
  }
}
