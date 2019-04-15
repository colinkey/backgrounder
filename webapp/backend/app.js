const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./lib/db");

require("./lib/cron");

const app = express();
const port = 1776;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res, next) => {
  const subreddits = db.get("subreddits").value();
  const imagesFromDb = db.get("images").value();

  const images = [...imagesFromDb].sort((a, b) => a.date < b.date);

  res.send({ subreddits, images });
});

app.post("/subreddits/new", async (req, res, next) => {
  const { subreddit } = req.body;

  if (!subreddit) return res.send("nope...");

  const existingSubreddits = db.get("subreddits").value();

  if (existingSubreddits.includes(subreddit)) {
    return res.sendStatus(304);
  }

  const newSubreddits = db
    .get("subreddits")
    .push(subreddit)
    .write();

  res.send(newSubreddits);
});

app.delete("/subreddits/delete", async (req, res, next) => {
  const { subreddit } = req.body;

  if (!subreddit) return res.send("nope...");

  const newSubreddits = db
    .get("subreddits")
    .pull(subreddit)
    .write();

  res.send(newSubreddits);
});

app.delete("/image/:name", () => {
  const { name: imageName } = req.params;

  // remove the post somehow
});

app.listen(port, () => console.log(`Now listening on http://localhost:${port}`));
