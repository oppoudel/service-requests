import React, { useContext, Fragment } from "react";

import AppContext from "../../AppContext";
import { reduceData, reduceDatabyNeighborhoods } from "../../utils";
import Departments from "./Departments";
import Neighborhoods from "./Neighborhoods";

export default function Chart() {
  const features = useContext(AppContext);
  const byAgency = reduceData(features);
  const byNeighborhoods = reduceDatabyNeighborhoods(features);
  return (
    <Fragment>
      <Departments data={byAgency} />
      <Neighborhoods data={byNeighborhoods} />
    </Fragment>
  );
}
