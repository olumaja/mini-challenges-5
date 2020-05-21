const SpoilTomatoes = require('./SpoilTomatoes');

function rottenTomatoes(grid) {
  const spoilTomatoe = new SpoilTomatoes(grid)
  const { numGoodTomatoe, locationOfSpoiltTomatoes } = spoilTomatoe.getRottenTomatoes()
  return spoilTomatoe.getTimeOfSpread(locationOfSpoiltTomatoes, numGoodTomatoe)
}


module.exports = rottenTomatoes;
