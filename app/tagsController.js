const { Tag } = require("./model.js");

const tags = [
  "#love",
  "#instagood",
  "#fashion",
  "#photooftheday",
  "#art",
  "#photography",
  "#instagram",
  "#beautiful",
  "#picoftheday",
  "#nature",
  "#happy",
  "#cute",
  "#travel",
  "#style",
  "#followme",
  "#tbt",
  "#instadaily",
  "#repost",
  "#like4like",
  "#summer",
  "#beauty",
  "#fitness",
  "#food",
  "#selfie",
  "#me",
  "#instalike",
  "#girl",
  "#friends",
  "#fun",
].map((tag) => new Tag(tag, Math.floor(Math.random() * 1000)));

module.exports = {
  newTag: (data) => {
    console.log(data);
    const tag = new Tag(data.name, data.popularity);
    console.log(tag);
    tags.push(tag);
    return tag;
  },
  getRaw: () => tags.map((x) => x.name),
  getAll: () => tags,
  getById: (id) => tags.find((x) => x.id == id),
};
