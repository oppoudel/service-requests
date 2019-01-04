import React, { useContext, Fragment } from "react";
import AppContext from "../../AppContext";
import "./TopTen.css";
import {
  reduceData,
  reduceDatabyNeighborhoods,
  reducebySRType
} from "../../utils";
import Neighborhoods from "./Neighborhoods";
import Departments from "./Departments";
import Type from "./Type";

export default function TopTen() {
  const features = useContext(AppContext);
  const departments = reduceData(features);
  const neighborhoods = reduceDatabyNeighborhoods(features);
  const types = reducebySRType(features);

  return (
    <Fragment>
      <Type data={types} />
      <Departments data={departments} />
      <Neighborhoods data={neighborhoods} />
    </Fragment>
  );
}
