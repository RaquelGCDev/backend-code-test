FROM node:20.0.0-slim AS base

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install