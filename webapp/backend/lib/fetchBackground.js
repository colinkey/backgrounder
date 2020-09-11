const fetch = require("node-fetch");

async function fetchRedditData(subreddit) {
  if (!subreddit) return null;
  const redditRequest = await fetch(`https://reddit.com/r/${subreddit}/top.json?limit=1`);
  const redditData = await redditRequest.json();

  const { name, title, url, is_self, isVideo, thumbnail } = redditData.data.children[0].data;

  console.log(`Found top post in ${subreddit} with title: ${title}`);

  if (is_self || isVideo || thumbnail === "") {
    console.log(
      "Hmmm.. this doesn't look like an image post. Exiting. If you think this is an error, file an issue on GitHub with the subreddit and post title"
    );
    return null;
  }

  if (!url) {
    console.log(`No url found for top post in ${subreddit}`);
    return null;
  }

  return {
    name,
    subreddit,
    title,
    url,
    date: Date.now()
  };
}

async function fetchAllRedditData(subreddits) {
  if (!Array.isArray(subreddits)) return null;

  const allRedditData = await Promise.all(subreddits.map(subreddit => fetchRedditData(subreddit)));

  return allRedditData;
}

module.exports = { fetchAllRedditData };
