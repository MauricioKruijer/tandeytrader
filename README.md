# tandeytrader

Hooking up tradingview webhooks to share chart images on telegram

# How to run?

Set up your google cloud environment, good luck.
To run this on local environments do the following steps:

## Copy env files

You have to maintain 2 environment files for each app (for now). The .env.yaml file is used for google cloud functions deploy script. The other .env is used by `nx`.

Copy example files and update the proper values

```shell
cp ./packages/apps/dolladollabillbot/.env.example ./packages/apps/dolladollabillbot/.local.env
cp ./packages/apps/dolladollabillbot/.env.yaml.example ./packages/apps/dolladollabillbot/.env.yaml
```

## Install dependencies

```shell
npm install
```

## Build

You can add `--watch` to this command too. 
```
nx run-many --target=build --all
```

## Serving the apps locally

```shell
nx run-many --target=serve --all
```

## Deploying to google cloud platform

```shell
nx deploy --gcpProject=INSERT_YOUR_GCP_PROJECT_NAME --output=stream
```
