const createTweet = require('./create_tweet');
const https = require('https');

let previousData = [];

function fetchData() {
    https.get('https://catalog.roblox.com/v2/search/items/details?SortType=3', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const jsonData = JSON.parse(data);
            const newItems = jsonData.data.filter(item => !previousData.some(prevItem => prevItem.id === item.id));

            newItems.forEach(item => {
                createTweet(`New Item: ${item.name} by ${item.creatorName}\nPrice: ${item.price} Robux\n\nhttps://www.roblox.com/catalog/${item.productId.toString()}/`);
            });

            previousData = jsonData.data;
        });
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
}
fetchData()

setInterval(fetchData, 60000); // Fetch data every 60 seconds