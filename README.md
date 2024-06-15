<div align=center>
    <img width="100" alt="Roblox Catalog Notifier" src="assets/icon.png" />
    <h1>Roblox Catalog Notifier</h1>
</div>

> [!WARNING]  
> This repository is no longer being maintained and is now archived.

A Node.js server that posts new Roblox items to Twitter. You can see it in action on [@CatalogUpdates](https://twitter.com/CatalogUpdates).

Fetches the latest items using the [Roblox Marketplace API](https://create.roblox.com/docs/projects/assets/api#marketplace-api) then posts new items to Twitter using the [Twitter API](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api).

## Prerequisites

* Twitter API Essential Access ([sign up here](https://t.co/signup))
* A Project and an App created [in the Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)

## Setup

### Install dependencies

To install all of this project's dependencies, first make sure you have NPM installed and then run the below command to install dependencies.

```
npm install
```

### Add environment variables

We need to setup environment variables so we know how to access your App and tweet using it.

You can find your credentials in the App inside of your Project in the [dashboard of the developer portal](https://developer.twitter.com/en/portal/projects-and-apps).

Once you found then, create a `.env` in the root of your project, typically the same directory as [`index.js`](index.js). It should look like the below but with different keys.

```properties
CONSUMER_KEY=QAktM6W6DF6F7XXXXXX
CONSUMER_SECRET=AJX560A2Omgwyjr6Mml2esedujnZLHXXXXXX
ACCESS_TOKEN=1995XXXXX-0NGqVhk3s96IX6SgT3H2bbjOPjcyQXXXXXXX
ACCESS_TOKEN_SECRET=rHVuh7dgDuJCOGeoe4tndtjKwWiDjBZHLaZXXXXXX
```

## Usage

### Starting

Once you have finished [setting up your project](#setup), you can use NPM to start the server.

```
npm start
```

### Testing

If you plan to push code then you should be testing it. Run the below command to run jest tests using npm.

```
npm test
```

## License

Licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0). See [LICENSE](LICENSE) for details.
