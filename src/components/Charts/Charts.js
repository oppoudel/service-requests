import React, { useContext, Fragment } from "react";

import AppContext from "../../AppContext";
import {
  reduceData,
  reduceDatabyNeighborhoods,
  reducebySRType
} from "../../utils";
import Departments from "./Departments";
import Neighborhoods from "./Neighborhoods";
import Types from "./Types";

export default function Chart() {
  const features = useContext(AppContext);
  const byAgency = reduceData(features);
  const byNeighborhoods = reduceDatabyNeighborhoods(features);
  const byTypes = reducebySRType(features);
  return (
    <Fragment>
      <Types data={byTypes} />
      <Departments data={byAgency} />
      <Neighborhoods data={byNeighborhoods} />
    </Fragment>
  );
}
