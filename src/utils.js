import { groupBy } from "lodash";

export const reduceData = features => {
  const byAgency = groupBy(features, item => item.properties.agency);
  const topTenAgency = Object.keys(byAgency)
    .sort((a, b) => byAgency[b].length - byAgency[a].length)
    .slice(0, 10);
  const isOpen = f => f.properties.srstatus === "Open";
  const isNew = f => f.properties.srstatus === "New";
  const isClosed = f => f.properties.srstatus === "Closed";
  const notClosed = f => f.properties.srstatus !== "Closed";
  const data = topTenAgency.reduce((arr, item) => {
    arr.push({
      Departments: item,
      TotalSr: byAgency[item].length,
      Open: byAgency[item].filter(isOpen).length,
      New: byAgency[item].filter(isNew).length,
      Closed: byAgency[item].filter(isClosed).length,
      NotClosed: byAgency[item].filter(notClosed).length
    });
    return arr;
  }, []);
  return data;
};
export const reduceDatabyNeighborhoods = features => {
  const byNeighborhood = groupBy(
    features,
    item => item.properties.neighborhood
  );
  const Neighborhoods = Object.keys(byNeighborhood)
    .sort((a, b) => byNeighborhood[b].length - byNeighborhood[a].length)
    .slice(0, 10);
  const isOpen = f => f.properties.srstatus === "Open";
  const isNew = f => f.properties.srstatus === "New";
  const isClosed = f => f.properties.srstatus === "Closed";
  const notClosed = f => f.properties.srstatus !== "Closed";
  const data = Neighborhoods.reduce((arr, item) => {
    arr.push({
      Neighborhoods: item,
      TotalSr: byNeighborhood[item].length,
      Open: byNeighborhood[item].filter(isOpen).length,
      New: byNeighborhood[item].filter(isNew).length,
      Closed: byNeighborhood[item].filter(isClosed).length,
      NotClosed: byNeighborhood[item].filter(notClosed).length
    });
    return arr;
  }, []);
  return data;
};
