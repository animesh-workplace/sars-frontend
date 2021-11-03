## For ALPINE version
FROM node:14-alpine
RUN apk update && apk upgrade && apk add git
WORKDIR /frontend
# RUN addgroup non-root && adduser -DH -G non-root non-root
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
