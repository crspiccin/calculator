#!/bin/bash

# Check if .env file exists in app folder
if [ ! -f app/.env ]; then
  echo "DB_NAME=calculator.db" > app/.env
  echo "PORT=3010" > app/.env
fi

# Check if .env file exists in app folder
if [ ! -f view/.env ]; then
  echo "REACT_APP_PRO_BACK_URL="http://localhots:3010"" > app/.env
fi

# Run npm install and npm run dev on app folder
cd app
npm install

# Run npm install and npm start on view folder
cd ../view
npm install