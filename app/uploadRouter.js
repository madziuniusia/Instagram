const { getRequestData, EndResult } = require("./utils.js");
const fileController = require("./fileController");

const path = require("path");
const { request } = require("http");

const router = async (req, res) => {
  const data = await fileController.saveImage(req.url.substring(1));
  if (data) {
    EndResult(res, data);
  } else EndResult(res, "File not found");
};

module.exports = router;
