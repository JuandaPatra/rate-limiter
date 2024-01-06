const url = require("url");
const express = require("express");

const needle = require("needle");

const apicache = require('apicache')
const router = express.Router();
// env var
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//init api cache

let cache = apicache.middleware

router.get("/", cache('2 minutes'), async (req, res) => {
  try {
    const appid = API_KEY_VALUE;
    const query = req.query.q;
    
    const apiRes = await needle(
      "get",
      `https://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${query}`
    );
    const data = apiRes.body;

    if(process.env.NODE_ENV !== 'production'){
      console.log(`REQUEST :https://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${query} `)
    }
    res.status(200).json(data);

  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
