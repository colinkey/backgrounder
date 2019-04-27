import React from "react";
import Router from "next/router";

import { getFetch } from "../util";

import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { GlobalStyle } from "../components/GlobalStyle";
import { Gallery } from "../components/Gallery";

function Home({ images, offset, url }) {
  const firstPage = offset === 0;
  const thatsAllFolks = images.length < 20;

  return (
    <div>
      <Layout>
        <Gallery url={url}>
          {images.length > 0 && images.map(wp => <Card key={wp.name} {...wp} />)}
        </Gallery>
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
              onClick={() => Router.push(`/?offset=${offset - 20}`)}
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
              onClick={() => Router.push(`/?offset=${offset + 20}`)}
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

Home.getInitialProps = async ({ query: { offset = 0 } }) => {
  const images = await getFetch(`/images/${offset}`);
  return {
    images,
    offset: Number(offset)
  };
};

export default Home;
