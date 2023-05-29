const userController = require("./userController");
const bcryptController = require("./bcrypt");
const { getRequestData, EndResult } = require("./utils.js");

const router = async (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url.startsWith("/api/user/confirm/")) {
        const token = req.url.substr(18);
        const verifyToken = await bcryptController.verifyToken(token);
        const data = await userController.confirm(verifyToken);
        EndResult(res, data);
      } else if (req.url === "/api/user") {
        const data = await userController.getAll();
        EndResult(res, data);
      }
      break;
    case "POST":
      if (req.url == "/api/user/register") {
        const requestData = JSON.parse(await getRequestData(req));
        const encryptPass = await bcryptController.encryptPass(requestData.password);
        const token = await bcryptController.createToken({ email: requestData.email, password: encryptPass });
        const data = await userController.register(requestData, encryptPass, token);
        EndResult(res, data);
      } else if (req.url == "/api/user/login") {
        const requestData = JSON.parse(await getRequestData(req));
        const encryptPass = await userController.login(requestData.email);
        const decryptPass = await bcryptController.decryptPass(requestData.password, encryptPass);
        if (decryptPass) {
          const token = await bcryptController.createToken({ email: requestData.email, name: requestData.name, lastname: requestData.lastname });
          EndResult(res, "Authorization" + " Bearer " + token);
        } else {
          EndResult(res, "Błędne hasło");
        }
      }
      break;
  }
};

module.exports = router;
