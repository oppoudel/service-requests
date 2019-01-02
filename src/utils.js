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
      Agency: item,
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
