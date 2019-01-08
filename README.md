## A Cache Application Using MongoDB

---

This project is a NodeJS REST API that exposes methods to interact with a MongoDB cache

### Prerequisites

- Express.js
- MongoDB

### Features

- An endpoint that returns the cached data for a given key
  - If the key is not found in the cache:
    - Create a random string
    - Update the cache with this random string
    - Return the random string
  - If the key is found in the cache:
    - Get the data for this key
    - Return the data

- An endpoint that returns all stored keys in the cache
- An endpoint that creates/updates the data for a given key
- An endpoint that removes a given key from the cache
- An endpoint that removes all keys from the cache

### Additional Features

- The number of entries allowed in the cache is limited. If the maximum amount of cached items is reached, some old entry needs to be overwritten (Please explain the approach of what is overwritten in the comments of the source code)
- Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data will not be used. A new random value will then be generated (just like cache miss). The TTL will be reset on every read/cache hit

### Setup

Clone the project and from the project directory, run:

#### With Docker (Recommended)

Make the start script executable

```bash
chmod +x ./bin/start.sh
```

Run the start script

```bash
./bin/start.sh
```

From inside the resulting bash shell

```bash
npm start
```

#### Without Docker

Install dependencies

```bash
npm install
```

The to start the project, run:

```bash
npm start
```

The app should be available at:
```bash
localhost:8080
```

## Authors

* **Excellence Ilesanmi** - *Initial work* - [Lon](https://github.com/lon-io)
