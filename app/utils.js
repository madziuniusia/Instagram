(getRequestData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (part) => {
        body += part.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}),
  (EndResult = (res, data) => {
    res.writeHead(201, {
      "Content-Type": "application/json;charset=utf-8",
    });
    res.end(JSON.stringify(data, null, 5));
  }),
  (SeperatedPath = (path) => {
    const PATH_SEP = path.split(".");
    return {
      pathNoExtension: PATH_SEP[0],
      extension: PATH_SEP[1],
    };
  });

module.exports = { getRequestData, EndResult, SeperatedPath };
