const fileController = require("./fileController.js");
const jsonController = require("./jsonController.js");
const { getRequestData, EndResult } = require("./utils.js");

const router = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/photos") {
        const data = jsonController.getall();
        EndResult(res, data);
      } else if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
        let arrayUrl = req.url.split("/");
        jsonController.returFile(arrayUrl[arrayUrl.length - 1], res);
      } else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
        let arrayUrl = req.url.split("/");
        const data = jsonController.get(arrayUrl[arrayUrl.length - 1])?.tags ?? [];
        console.log(data);
        EndResult(res, data);
      }
      break;
    case "POST":
      if (req.url == "/api/photos") {
        const data = await fileController.saveImage(req);
        EndResult(res, data);
      }
      break;
    case "DELETE":
      if (req.url.match(/\/api\/photos\/([0-9]+)/)) {
        const arrayUrl = req.url.split("/");
        const data = jsonController.delete(arrayUrl[arrayUrl.length - 1]);
        await fileController.deleteImage(data.url);
        EndResult(res, data);
      }
      break;
    case "PATCH":
      if (req.url == "/api/photos") {
        const data = await getRequestData(req);
        const endData = await jsonController.update(JSON.parse(data));
        EndResult(res, endData);
      } else if (req.url == "/api/photos/tags") {
        const data = JSON.parse(await getRequestData(req));
        const result = jsonController.addTag(data);
        EndResult(res, result);
      } else if (req.url == "/api/photos/tags/mass") {
        const data = JSON.parse(await getRequestData(req));
        const addTags = jsonController.addManyTags(data);
        EndResult(res, addTags);
      }
      break;
    default:
      break;
  }
};

module.exports = router;
