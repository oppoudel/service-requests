import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { HexagonLayer } from "deck.gl";

const TOKEN =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export const INITIAL_VIEW_STATE = {
  latitude: 39.2895,
  longitude: -76.5815,
  zoom: 11,
  minZoom: 9,
  maxZoom: 19,
  pitch: 40.5,
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
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = { min: 1, max: 50 };

export default class Map extends Component {
  state = {
    elevationScale: elevationScale.min
  };
  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data &&
      this.props.data &&
      nextProps.data.length !== this.props.data.length
    ) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({ elevationScale: this.state.elevationScale + 1 });
    }
  }

  _renderLayers() {
    const { data } = this.props;
    return [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        coverage: 0.8,
        elevationRange: [0, 3000],
        elevationScale: this.state.elevationScale,
        extruded: true,
        data,
        opacity: 1,
        radius: 150,
        getPosition: d => d.geometry.coordinates,
        lightSettings: LIGHT_SETTINGS,
        upperPercentile: 100
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
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}
