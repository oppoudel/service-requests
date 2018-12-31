import React from "react";
import { Header, Container } from "semantic-ui-react";
import "./Header.css";

function Head({ menu, days }) {
  return (
    <div className="header-container">
      <Container>
        <Header
          as="h3"
          style={{
            textTransform: "capitalize"
          }}
        >
          Service requests in Last {days} days
        </Header>
      </Container>
    </div>
  );
}

export default Head;
