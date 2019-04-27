const cron = require("node-cron");

const { fetchAllRedditData } = require("./fetchBackground");
const db = require("./db");

cron.schedule("10 * * * *", async () => {
  const subreddits = db.get("subreddits").value();

  const redditData = await fetchAllRedditData(subreddits);

  const dbImgNames = db
    .get("images")
    .map("name")
    .value();

  const filteredRedditData = redditData.filter(image => !dbImgNames.includes(image.name));

  db.get("images")
    .push(...filteredRedditData)
    .write();

  console.log(
    `${redditData.length} images found. ${
      filteredRedditData.length
    } images saved. (${redditData.length - filteredRedditData.length} dupicates not saved)`
  );
});
