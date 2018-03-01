# email-campaign

A school project to learn restful API's

## Requirements

- NodeJs
- NPM
- Docker
- Docker-compose

## Installation

- Clone repository : `git clone https://github.com/Pochwar/email-campaign.git`
- Copy `.env.exemple` to `.env`


### Method 1 - Full Docker
- In `.env`, set `DB_HOST` to `mongo` and `PORT` to `3000`
- Run `docker-compose up`
- View App at `http://localhost:3000`

### Method 2 - Node & Docker
- Run `docker-compose -f dc-mongo.yml up` to launch mongo container
- In `.env`, set `DB_HOST` to `0.0.0.0`
- Run `npm install` to install packages
- Run `npm run build` to build App
- Run `npm run launch` to launch App OR run `npm run dev` to launch App with hot reload
- View App at `http://localhost:3000`

## Documentation

- Generate the doc with Apidoc, run `apidoc -i src doc`