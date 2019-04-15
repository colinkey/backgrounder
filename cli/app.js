const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;
const wallpaper = require("wallpaper");

const subreddit = process.argv.slice(2)[0];

function setOptions() {
  if (!subreddit) {
    console.log("Missing subreddit parameter!");
    process.exit(0);
  }
  return (options = {
    hostname: "www.reddit.com",
    path: `/r/${subreddit}/top.json?limit=1`,
    method: "GET",
    agent: false
  });
}

function handleRedditData(response) {
  const chunks = [];
  response.on("data", data => {
    chunks.push(data);
  });

  response.on("end", () => {
    if (response.statusCode !== 200) {
      console.log("The request was not successful");
      console.log(`Status code ${response.statusCode}`);
      process.exit(0);
    }

    const responseData = JSON.parse(Buffer.concat(chunks));
    console.log(`Found top post with title: ${responseData.data.children[0].data.title}`);

    if (
      responseData.data.children[0].data.is_self ||
      responseData.data.children[0].data.isVideo ||
      responseData.data.children[0].data.thumbnail === ""
    ) {
      console.log(
        "Hmmm.. this doesn't look like an image post. Exiting. IF you think this is an error, file an issue on GitHub with the subreddit and post title"
      );
      process.exit(0);
    }

    const bgUrl = responseData.data.children[0].data.url;
    if (!bgUrl) {
      console.log("No url found for top post in " + subreddit);
      process.exit(0);
    }

    handleImageSave(bgUrl);
  });

  response.on("error", err => {
    console.log("An error occurred!");
    console.log(err);
    process.exit(0);
  });
}

function handleImageSave(url) {
  console.log("Downloading image...");
  const filename = `${subreddit}-${new Date().toLocaleDateString().replace(/\//g, "")}`;
  https.get(url, res => {
    const chunks = new Stream();
    res.on("data", data => {
      chunks.push(data);
    });

    res.on("end", async () => {
      console.log("Setting wallpaper...");
      if (!fs.existsSync("./images")) {
        fs.mkdirSync("./images");
      }
      await fs.writeFileSync(`images/${filename}.png`, chunks.read());
      await wallpaper.set(`images/${filename}.png`);
      console.log("Done!");
    });

    res.on("error", err => {
      console.log("An error occurred!");
      console.log(err);
      process.exit(0);
    });
  });
}

async function main() {
  const options = setOptions();
  https.get(options, res => handleRedditData(res));
}

main();
