#!/bin/bash
cd /home/kavia/workspace/code-generation/city-weather-and-news-dashboard-20876/weather_news_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

