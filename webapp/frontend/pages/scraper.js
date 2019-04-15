import React from "react";

import { getFetch, postFetch, deleteFetch } from "../util";

import { GlobalStyle } from "../components/GlobalStyle";
import { Layout } from "../components/Layout";

class Scraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: this.props.subreddits,
      newSubreddit: ""
    };
  }

  addSubreddit = async subreddit => {
    const response = await postFetch("/subreddits/new", { subreddit });
    this.setState({
      subreddits: response,
      newSubreddit: ""
    });
  };

  deleteSubreddit = async subreddit => {
    const response = await deleteFetch(`/subreddits/delete`, { subreddit });
    this.setState({
      subreddits: response
    });
  };

  render() {
    const { subreddits } = this.state;
    return (
      <Layout>
        <h3>Scraper Settings</h3>
        {subreddits.map(sr => (
          <p key={`sr-${sr}`}>
            {sr}
            <button onClick={() => this.deleteSubreddit(sr)}>Get rid of me pls</button>
          </p>
        ))}
        <form
          type="submit"
          onSubmit={e => {
            e.preventDefault();
            this.addSubreddit(this.state.newSubreddit);
          }}
        >
          <input
            type="text"
            name="new-subreddit"
            id="new-subreddit"
            value={this.state.newSubreddit}
            onChange={e => this.setState({ newSubreddit: e.target.value })}
          />
          <button>Save</button>
        </form>
        <GlobalStyle />
      </Layout>
    );
  }
}

Scraper.getInitialProps = async () => {
  const data = await getFetch();
  return data;
};

export default Scraper;
