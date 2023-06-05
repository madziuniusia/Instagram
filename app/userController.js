const { User } = require("./model");
const bcryptController = require("./bcrypt");

let Users = [];

module.exports = {
  register: async (data, password, token) => {
    return new Promise((resolve, reject) => {
      try {
        const FindEmail = Users.find((user) => user.email == data.email);
        if (FindEmail == undefined) {
          const NewUser = new User(data.name, data.lastName, data.email, password);
          Users.push(NewUser);
          resolve("Potwierdź swoje konto tym linkiem  " + "http://localhost:5000/api/user/confirm/" + token);
        } else resolve("User o takim mailu już istnieje");
      } catch (error) {
        reject(error);
      }
    });
  },
  confirm: async (response) => {
    return new Promise((resolve, reject) => {
      try {
        if (response != "invalid token") {
          Users.map((x) => {
            if (x.email == response.email) {
              x.confirmed = true;
            }
          });
          const User = Users.find((user) => user.email == response.email);
          resolve(User);
        } else resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  login: async (requestData) => {
    const User = Users.find((user) => user.email == requestData.email);
    if (User == undefined) return { message: "Taki user nie istnieje" };
    else {
      if (User.confirmed) {
        const encryptPass = User.password;
        const decryptPass = await bcryptController.decryptPass(requestData.password, encryptPass);
        if (decryptPass) {
          const token = await bcryptController.createToken({ email: requestData.email, name: requestData.name, lastname: requestData.lastname });
          return { token: token, message: "correct", login: requestData.email };
        } else {
          return { message: "błędne hasło" };
        }
      } else {
        return { message: "niepotwierdzone konto" };
      }
    }
  },
  AvatarFile: (res, data) => {
    const file = Users.find((x) => {
      return x.email == data.email;
    });
    if (file) {
      const filePath = file.url;
      const stat = fs.statSync(filePath);

      response.writeHead(200, {
        "Content-Type": "image/" + "jpg",
        "Content-Length": stat.size,
      });
      fs.readFile(filePath, function (err, content) {
        res.end(content);
      });
    }
  },
  getAll: () => Users,
  getOne: (id) => Users.find((user) => user.id == id),
  update: (id, data) => {
    const User = Users.find((user) => user.id == id);
    if (User === undefined) return "Taki user nie istnieje";
    else {
      if (data.name) User.name = data.name;
      if (data.lastName) User.lastName = data.lastName;
      if (data.password) User.password = data.password;
      if (data.url) User.url = data.url;
      return User;
    }
  },
};
