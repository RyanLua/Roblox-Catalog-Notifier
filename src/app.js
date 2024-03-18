const createTweet = require('./create_tweet');
const https = require('https');

let previousData = [];
let tweetQueue = [];

function fetchData() {
    https.get('https://catalog.roblox.com/v2/search/items/details?Category=13&SortType=3&Limit=10', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const jsonData = JSON.parse(data);
            const newItems = jsonData.data.filter(item => !previousData.some(prevItem => prevItem.id === item.id));

            newItems.forEach(item => {
                tweetQueue.push(`New Item: ${item.name} by ${item.creatorName}\nPrice: ${item.price} Robux\n\nhttps://www.roblox.com/catalog/${item.productId.toString()}/`);
            });

            previousData = jsonData.data;
        });
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
}

function postTweet() {
    if (tweetQueue.length > 0) {
        createTweet(tweetQueue.shift());
    }
}

module.exports = { postTweet, createTweet, tweetQueue };

fetchData();
setInterval(fetchData, 60000); // Fetch data every 60 seconds
setInterval(postTweet, 10000); // Post a tweet every 10 seconds