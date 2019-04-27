const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./lib/db");
require("./lib/cron");

const PORT = process.env.PORT || 1776;
const dev = process.env.NODE_ENV !== "production";

const backgrounder = next({ dev, dir: "./frontend" });
const nextHandler = backgrounder.getRequestHandler();

backgrounder.prepare().then(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.get("/api/images/:offset", async (req, res, next) => {
    const { offset = 0 } = req.params;
    const imagesFromDb = db.get("images").value();

    const images = [...imagesFromDb]
      .sort((a, b) => a.date < b.date)
      .slice(Number(offset), Number(offset) + 20);

    res.send(images);
  });

  app.post("/api/subreddits/new", async (req, res, next) => {
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

  app.delete("/api/subreddits/delete", async (req, res, next) => {
    const { subreddit } = req.body;

    if (!subreddit) return res.send("nope...");

    const newSubreddits = db
      .get("subreddits")
      .pull(subreddit)
      .write();

    res.send(newSubreddits);
  });

  app.delete("/api/image/:name", async (req, res, next) => {
    const { name } = req.params;

    db.get("images")
      .remove({ name })
      .write();

    res.status(200).send({ status: "success" });
  });

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
