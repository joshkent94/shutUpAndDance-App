# Shut Up And Dance App

> Search and discuss music by genre

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## General info

A project to test out my PERN stack developer skills.

## Screenshot

![Screenshot of app working](./client/src/assets/in-action.png)

## Technologies

- HTML
- SASS
- Javascript
- Typescript
- React
- Redux
- Express
- Node.js
- Postgresql

## Setup

Node is required to work on this app. Clone the repo and run npm install in both the root folder and client folder. Create a postgresql database and run the commands in init.sql file in the server folder to create database schema. Create a .env file in both the root folder and client folder. The one in the root folder should contain database connection details and a session secret, the one in the client folder should contain details to run a react https development server and the Spotify client ID and secret. Lastly, create a file called httpsConfig.js in the server folder that should contain the credentials to run a https express server.

## Features

Features ready:

- Register for an account, login and have sessions persist.
- Create a custom dashboard by selecting and positioning widgets.
- Select favourite music genres and receive song suggestions based on your choices.
- Create, like and comment on threads.
- Amend and save account details.

## Status

Project is unfinished.

## Contact

Created by [@joshuakent](josh.kent94@yahoo.co.uk) - feel free to contact me!
