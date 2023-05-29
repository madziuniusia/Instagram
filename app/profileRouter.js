const fileController = require("./fileController.js");
const jsonController = require("./jsonController.js");
const { getRequestData, EndResult } = require("./utils.js");
const bcryptController = require("./bcrypt");

const router = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/profile") {
        const data = await bcryptController.verifyToken();
        // pobranie danych usera, na podtawie tokena?
        EndResult(res, data);
      } else if (req.url == "/api/profile/logout ") {
        //usuniecie tokena
        EndResult(res, "LOG OUT");
      }
      break;
    case "POST":
      if (req.url == "/api/profile") {
        //zmiana profilowego z tokenem
        res.end(JSON.stringify(data, null, 5));
      }
      break;
    case "PATCH":
      if (req.url == "/api/profile") {
        //zmiena imienia i nazwiska w danych z tokenem
        const data = await utils(req);
        const endData = await jsonController.update(JSON.parse(data));
        res.end(JSON.stringify(endData, null, 5));
      }
      break;
    default:
      break;
  }
};

module.exports = router;
