const tagsController = require("./tagsController");
const { getRequestData, EndResult } = require("./utils.js");

const router = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/tags/raw") {
        const data = tagsController.getRaw();
        EndResult(res, data)
      }
      else if (req.url === "/api/tags") {
        const data = tagsController.getAll();
        EndResult(res, data)
      }
      else if (req.url.match(/\/api\/tags\/([0-9]+)/)) {
        let arrayUrl = req.url.split("/");
        const data = tagsController.getById(arrayUrl[arrayUrl.length - 1]);
        EndResult(res, data)
      }
      break;
    case "POST":
      if (req.url == "/api/tags") {
        const requestData = JSON.parse(await getRequestData(req));
        const data = tagsController.newTag(requestData);
        EndResult(res, data)
      }
      break;
  }
};

module.exports = router;
