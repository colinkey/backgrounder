import React from "react";

import { getFetch, postFetch, deleteFetch } from "../util";

import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { GlobalStyle } from "../components/GlobalStyle";
import { Gallery } from "../components/Gallery";

function Home({ images }) {
  return (
    <div>
      <Layout>
        <Gallery>{images.length > 0 && images.map(wp => <Card key={wp.name} {...wp} />)}</Gallery>
        <GlobalStyle />
      </Layout>
    </div>
  );
}

Home.getInitialProps = async () => {
  const props = await getFetch();
  return props;
};

export default Home;
