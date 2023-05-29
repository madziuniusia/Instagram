const jwt = require("jsonwebtoken");

const createToken = async () => {
  let token = await jwt.sign(
    {
      email: "aaa@test.com",
      anyData: "123",
    },
    "verysecretkey", // powinno być w .env
    {
      expiresIn: "30s", // "1m", "1d", "24h"
    }
  );
  console.log({ token: token });
};

const verifyToken = async (token) => {
  try {
    let decoded = await jwt.verify(token, "verysecretkey");
    console.log({ decoded: decoded });
  } catch (ex) {
    console.log({ message: ex.message });
  }
};

const processToken = async () => {
  await createToken();
  await verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE2ODQ3ODE3MDAsImV4cCI6MTY4NDc4MTczMH0.yzZsmgKnDKUfqddHdU3CsQjIM5536EkggD9fiWaWhzQ");
};

processToken();
