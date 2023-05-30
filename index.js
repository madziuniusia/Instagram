const http = require("http");
const router = require("./app/router");
const tagRouter = require("./app/tagsRouter");
const filtersRouter = require("./app/filtersRouter");
const usersRouter = require("./app/userRouter");
const profileRouter = require("./app/profileRouter");
const uploadRouter = require("./app/uploadRouter");
const logger = require("tracer").colorConsole();

require("dotenv").config();

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.writeHead(204);
      res.end();
      return;
    }
    if (req.url.startsWith("/api/photos")) {
      router(req, res);
    } else if (req.url.startsWith("/api/tags")) {
      tagRouter(req, res);
    } else if (req.url.startsWith("/api/filters")) {
      filtersRouter(req, res);
    } else if (req.url.startsWith("/api/user")) {
      usersRouter(req, res);
    } else if (req.url.startsWith("/api/profile")) {
      profileRouter(req, res);
    } else if (req.url.startsWith("/uploads")) {
      uploadRouter(req, res);
    }
  })
  .listen(process.env.APP_PORT, () => logger.debug(`listen on ${process.env.APP_PORT}`));
