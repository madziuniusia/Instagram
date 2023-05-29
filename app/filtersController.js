const jsonController = require("./jsonController");
const fs = require("fs");
const sharp = require("sharp");
const { SeperatedPath } = require("./utils");

async function useFilter(photoUrl, meta, newImagePath) {
  const TYPE_FILTER = meta.filterType;

  if (TYPE_FILTER === "rotate") {
    await sharp(photoUrl).rotate(meta.rotateValue).toFile(newImagePath);
  } else if (TYPE_FILTER === "resize") {
    await sharp(photoUrl).resize(meta.widthValue, meta.heightValue).toFile(newImagePath);
  } else if (TYPE_FILTER === "negate") {
    await sharp(photoUrl).negate().toFile(newImagePath);
  } else if (TYPE_FILTER === "grayscale") {
    await sharp(photoUrl).grayscale().toFile(newImagePath);
  } else if (TYPE_FILTER === "crop") {
    await sharp(photoUrl)
      .extract({
        width: meta.widthValue,
        height: meta.heightValue,
        left: meta.leftValue,
        top: meta.topValue,
      })
      .toFile(newImagePath);
  } else if (TYPE_FILTER === "tint") {
    await sharp(photoUrl)
      .extract({
        r: meta.rValue,
        g: meta.gValue,
        b: meta.bValue,
      })
      .toFile(newImagePath);
  } else if (TYPE_FILTER === "flip") {
    await sharp(photoUrl).flip().toFile(newImagePath);
  } else if (TYPE_FILTER === "flop") {
    await sharp(photoUrl).flop().toFile(newImagePath);
  }
}

module.exports = {
  metadata: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const photo = jsonController.get(id);
        if (photo.url) {
          let meta = await sharp(photo.url).metadata();
          resolve(meta);
        } else {
          resolve("url_not_found");
        }
      } catch (err) {
        reject(err.mesage);
      }
    });
  },
  sharpFilter: async (infoJSON, DataImg) => {
    const photoUrl = DataImg.url;
    const SepImgPath = SeperatedPath(photoUrl);
    const newImagePath = `${SepImgPath.pathNoExtension}-${infoJSON.filterType}.${SepImgPath.extension}`;
    await useFilter(photoUrl, infoJSON, newImagePath);
    const infoToUpdate = { id: infoJSON.id, status: infoJSON.filterType, statusUrl: newImagePath };
    const data = jsonController.update(infoToUpdate);
    return data;
  },
};
