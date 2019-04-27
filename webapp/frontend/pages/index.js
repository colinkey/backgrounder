import React from "react";
import Router from "next/router";

import { getFetch } from "../util";

import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { GlobalStyle } from "../components/GlobalStyle";
import { Gallery } from "../components/Gallery";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    };
  }

  static async getInitialProps({ query: { offset = 0 } }) {
    const images = await getFetch(`/images/${offset}`);
    return {
      images,
      offset: Number(offset)
    };
  }

  render() {
    const { images } = this.props;

    const firstPage = this.props.offset === 0;
    const thatsAllFolks = images.length < 20;

    return (
      <div>
        <Layout>
          <Gallery>{images.length > 0 && images.map(wp => <Card key={wp.name} {...wp} />)}</Gallery>
          <div
            style={{
              margin: "25px auto",
              display: "flex",
              justifyContent: "space-around",
              maxWidth: "300px"
            }}
          >
            {!firstPage && (
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "1.5rem"
                }}
                onClick={() => Router.push(`/?offset=${this.props.offset - 20}`)}
              >
                👈
              </button>
            )}
            {!thatsAllFolks && (
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "1.5rem"
                }}
                onClick={() => Router.push(`/?offset=${this.props.offset + 20}`)}
              >
                👉
              </button>
            )}
          </div>
          <GlobalStyle />
        </Layout>
      </div>
    );
  }
}

export default Home;
