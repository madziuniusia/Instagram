const { time } = require("console");

class Photo {
  constructor(id, album, originalName, url, lastChange, stamp) {
    this.id = id;
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.lastChange = "original";
    this.history = [{ status: "original", timestamp: Date.now() }];
    this.tags = [];
  }
}
let lastTagId = 0;
class Tag {
  constructor(name, popularity) {
    this.name = name;
    this.popularity = popularity;
    this.id = lastTagId++;
  }
}
let lastUserId = 0;
class User {
  constructor(name, lastName, email, password) {
    this.id = lastUserId++;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.confirmed = false;
    this.password = password;
    this.url = "uploads\\avatar\\default.jpg";
  }
}
module.exports = { Photo, Tag, User };
