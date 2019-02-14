import React from "react";
import { Dropdown, Segment, Header } from "semantic-ui-react";

const options = [
  { text: "Central", value: "Central", key: 0 },
  { text: "Eastern1", value: "Eastern1", key: 1 },
  { text: "Eastern2", value: "Eastern2", key: 2 },
  { text: "Northeastern", value: "Northeastern", key: 3 },
  { text: "NorthWestern", value: "Northwestern", key: 4 },
  { text: "Tri-District", value: "Tri-District", key: 5 },
  { text: "Western", value: "Western", key: 6 },
  { text: "Brooklyn", value: "Brooklyn", key: 7 }
];

export default function CrimeSelection({ selected, setVRISelection }) {
  const handleSelectedChanged = (e, { value }) => {
    setVRISelection(value);
  };
  return (
    <Segment>
      <Header as="h4">Filter by VRI Zone</Header>
      <Dropdown
        placeholder="Select VRI"
        fluid
        selection
        multiple
        options={options}
        value={selected}
        onChange={handleSelectedChanged}
      />
    </Segment>
  );
}
