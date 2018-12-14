if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "mongodb://yone:yone1234@ds245347.mlab.com:45347/ishiki"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/ishikidb" };
}
