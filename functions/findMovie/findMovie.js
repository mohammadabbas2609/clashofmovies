const axios = require("axios");
require("dotenv").config({});

exports.handler = async event => {
  const { data } = await axios(
    `http://www.omdbapi.com/?t=${event.body}&apikey=${process.env.OMDB_API_KEY}`
  );

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
