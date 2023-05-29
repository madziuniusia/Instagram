const jsonController = require("./jsonController");
const filtersController = require("./filtersController");
const { getRequestData, EndResult } = require("./utils.js");

const router = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
        let arrayUrl = req.url.split("/");
        const data = await filtersController.metadata(arrayUrl[arrayUrl.length - 1]);
        EndResult(res, data);
      }
      break;

    case "PATCH":
      if (req.url == "/api/filters") {
        const Response = await getRequestData(req);
        const ResponseJSON = JSON.parse(Response);
        const DATA_IMAGE = jsonController.get(ResponseJSON.id);
        const data = await filtersController.sharpFilter(ResponseJSON, DATA_IMAGE);
        EndResult(res, data);
      }
      break;
    default:
      break;
  }
};

module.exports = router;
