import React, { useContext, Fragment } from "react";
import AppContext from "../../AppContext";
import "./TopTen.css";
import { reduceData, reduceDatabyNeighborhoods } from "../../utils";
import Neighborhoods from "./Neighborhoods";
import Departments from "./Departments";

export default function TopTen() {
  const features = useContext(AppContext);
  const departments = reduceData(features);
  const neighborhoods = reduceDatabyNeighborhoods(features);

  return (
    <Fragment>
      <Departments data={departments} />
      <Neighborhoods data={neighborhoods} />
    </Fragment>
  );
}
