import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { HexagonLayer } from "deck.gl";
import "./Map.css";

const TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export const INITIAL_VIEW_STATE = {
  latitude: 39.2895,
  longitude: -76.5815,
  zoom: 11,
  minZoom: 9,
  maxZoom: 19
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

export default class Map extends Component {
  _renderTooltip() {
    const { hoveredObject, pointerX, pointerY } = this.state || {};
    return (
      hoveredObject && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: pointerX,
            top: pointerY
          }}
          className="tooltip"
        >
          # SRs: {hoveredObject.points.length}
        </div>
      )
    );
  }
  _renderLayers() {
    const { data } = this.props;
    return [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        coverage: 1,
        extruded: false,
        data,
        opacity: 0.1,
        radius: 350,
        getPosition: d => d.geometry.coordinates,
        upperPercentile: 100,
        pickable: true,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y
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
            reuseMaps
            mapStyle="mapbox://styles/mapbox/light-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={TOKEN}
          />
          {this._renderTooltip()}
        </DeckGL>
      </div>
    );
  }
}
