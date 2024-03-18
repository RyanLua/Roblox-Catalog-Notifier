require('dotenv').config();
const got = require('got');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');


// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;


// Be sure to add replace the text of the with the text you wish to Tweet.
// You can also add parameters to post polls, quote Tweets, Tweet with reply settings, and Tweet to Super Followers in addition to other features.
function getData(content) {
    return {
        "text": content
    };
}

const endpointURL = `https://api.twitter.com/2/tweets`;

const oauth = OAuth({
    consumer: {
        key: consumer_key,
        secret: consumer_secret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});


async function getRequest({
    oauth_token,
    oauth_token_secret
}, content) {

    const token = {
        key: oauth_token,
        secret: oauth_token_secret
    };

    const authHeader = oauth.toHeader(oauth.authorize({
        url: endpointURL,
        method: 'POST'
    }, token));

    const req = await got.post(endpointURL, {
        json: getData(content),
        responseType: 'json',
        headers: {
            Authorization: authHeader["Authorization"],
            'user-agent': "v2CreateTweetJS",
            'content-type': "application/json",
            'accept': "application/json"
        }
    });
    if (req.body) {
        return req.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}


module.exports = async function createTweet(content) {
    try {
        // Get the access token and access token secret from environment variables
        const oAuthAccessToken = {
            oauth_token: process.env.ACCESS_TOKEN,
            oauth_token_secret: process.env.ACCESS_TOKEN_SECRET
        };
        // Make the request
        const response = await getRequest(oAuthAccessToken, content);
        console.dir(response, {
            depth: null
        });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
};