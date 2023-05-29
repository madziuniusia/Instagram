const { User } = require("./model");

let Users = [];

module.exports = {
  register: async (data, password, token) => {
    return new Promise((resolve, reject) => {
      try {
        const FindEmail = Users.find((user) => user.email == data.email);
        if (FindEmail == undefined) {
          const NewUser = new User(data.name, data.lastName, data.email, password);
          Users.push(NewUser);
          resolve("Potwierdź swoje konto tym linkiem  " + "http://localhost:3000/api/user/confirm/" + token);
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
  login: async (email) => {
    return new Promise((resolve, reject) => {
      try {
        const User = Users.find((user) => user.email == email);
        if (User == undefined) resolve("Taki user nie istnieje");
        else {
          if (User.confirmed) resolve(User.password);
          else resolve("Niepotwierdzone konto");
        }
      } catch (error) {
        reject(error);
      }
    });
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
