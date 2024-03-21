# Bun + Hono + Docker

This template provides a minimal setup to get an API working using [Bun](https://bun.sh/) and [Hono](https://hono.dev/getting-started/bun) with Docker and Docker compose for development and production.

## Development workflow

To run the project in dev mode:

```
docker compose watch -d
```

Docker compose automatically watches for changes to files and rebuilds the container if `package.json` changes

```
docker compose logs -f api
```

To install any NPM package

Add the package name and version to `package.json`. Docker will automatically install the package and make sure it's synced to the host

To stop the container

```
docker compose down
```

To check the health of a container. Installing `jq` is recommended

```
docker inspect <container name> | jq '.[].State.Health'
```

## Enhancements

- [x] Add an SQLite database with an ORM in front for a full dev experience
- [ ] Run with SQLite in production
- [ ] Replicate the SQLite database in production to an S3 compatible store: [MinIO](https://min.io/docs/minio/container/index.html)
