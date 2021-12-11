require("dotenv").config();
const fetch = require("node-fetch");
const path = require("path");
const chalk = require("chalk");
const flatCache = require("flat-cache");

// Config
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SHOW_ID = "6DVa9pLPKhlEJjdSUHALoK"; // Palabra Viva
const ITEMS_PER_REQUEST = 50;
const BASE_API_URL = "https://api.spotify.com/v1";
const CACHE_KEY = "shows";
const CACHE_FOLDER = path.resolve("./.cache");
const CACHE_FILE = "shows.json";

/**
 * Request podcast shows
 * @param {String} token - The token for the api request
 * @param {Int} skipRecords - number or records to skip
 * @return {Object} - Total number of items and API data
 */
async function requestShows(token, skipRecords = 0) {
    try {
        const url = `${BASE_API_URL}/shows/${SHOW_ID}/episodes?market=CO&offset=${skipRecords}&limit=${ITEMS_PER_REQUEST}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw response;
        });

        // return the total number of items to fetch and the data
        return {
            total: parseInt(response.total, 10),
            data: response.items,
        };
    } catch (err) {
        console.error(chalk.red("API not responding, no data returned"));
        return {
            total: 0,
            data: [],
        };
    }
}

/**
 * Get all episodes
 * - check if we have a cache
 * - if not make api requests and create cache
 * @return {Array} - array of API data (from cache if there is one or from API)
 */
async function getAllShows() {
    // load cache
    const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER);
    const cachedItems = cache.getKey(CACHE_KEY);

    // if we have a cache, return cached data
    if (cachedItems) {
        console.log(chalk.blue("Blogposts from cache"));
        return cachedItems;
    }

    // if we do not, make queries
    console.log(chalk.blue("Blogposts from API"));

    // Authorization flow
    const authResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET, "utf-8").toString(
                    "base64"
                ),
        },
        body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();

    const token = authData.access_token;

    // variables
    let requests = [];
    let apiData = [];
    let additionalRequests = 0;

    // make first request and marge results with array
    const request = await requestShows(token);
    apiData.push(...request.data);
    // calculate how many additional requests we need
    additionalRequests = Math.ceil(request.total / ITEMS_PER_REQUEST) - 1;

    // create additional requests
    for (let i = 1; i <= additionalRequests; i++) {
        let start = i * ITEMS_PER_REQUEST;
        const request = requestShows(token, start);
        requests.push(request);
    }

    // resolve all additional requests in parallel
    const allResponses = await Promise.all(requests);
    allResponses.map((response) => {
        apiData.push(...response.data);
    });

    // set and save cache
    if (apiData.length) {
        cache.setKey(CACHE_KEY, apiData);
        cache.save();
    }

    // return data
    return apiData;
}

// export for 11ty
module.exports = getAllShows;
