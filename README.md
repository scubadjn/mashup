# Mashup

## Quick start

```sh
yarn install && yarn start
# check health
curl http://localhost:3030/health
## fetch something
curl http://localhost:3030/v1/mashup/5b11f4ce-a62d-471e-81fc-a69a8278c7da
# force refetch to update cache
http://localhost:3030/v1/mashup/5b11f4ce-a62d-471e-81fc-a69a8278c7da?refetch
```

#### Lint
```sh
yarn lint
```

#### Test
```sh
yarn test
```

#### Build
```sh
yarn build
```

## Deploy
```sh
yarn install
yarn build
# run
node dist/api.min.js
# or create zip file
yarn package
```

# Todos
- [ ] add tests
- [ ] improve error handling
- [ ] improve logging
- [ ] containerize
- [ ] replace node-cache with redis or similar

