---
title: "Maximising Efficiency: Steps to Minimise Docker Build Time"
description: "As a developer, it is crucial to have an efficient docker build process to save time and streamline the development and testing of applications. In this blog, we will explore various steps to optimise the dockerfile build process, reduce build time, install necessary dependencies, and create lightweight and efficient docker images."
src: https://www.docker.com/wp-content/uploads/2023/08/logo-guide-logos-1.svg
author: Abisade Ogunwoolu
slug: maximising-efficiency-steps-to-minimise-docker-build-time
date: 2023-10-29
tags:
  - Docker
  - Optimising
---

## Introduction:
As a developer, it is crucial to have an efficient docker build process to save time and streamline the development and testing of applications. In this blog, we will explore various steps to *optimise the dockerfile build process, reduce build time, install necessary dependencies, and create lightweight and efficient docker images*.

## The Initial Dockerfile:
```dockerfile
# Single Build Stage
FROM node:latest
WORKDIR /app
COPY . .
RUN yarn install 
ENV DISABLE_ESLINT_PLUGIN=true NODE_ENV=production  
RUN yarn run build
EXPOSE 3000 
CMD [ "yarn", "start" ]
```

## The Final Dockerfile:
```dockerfile
# Define the ARGs at the top of your Dockerfile
ARG BASE_IMAGE=node:latest
ARG NGINX_IMAGE=nginx:latest

# -------------> Build Stage dev
FROM ${BASE_IMAGE} AS build-stage-dev
ENV DISABLE_ESLINT_PLUGIN=true
WORKDIR /app
COPY . .
RUN yarn install && yarn run build

FROM ${BASE_IMAGE} AS build-stage-prod
ENV DISABLE_ESLINT_PLUGIN=true
WORKDIR /app
COPY --from=build-stage-dev /app/node_modules ./node_modules
COPY . .
RUN yarn install && yarn run build

FROM ${NGINX_IMAGE} as deploy-stage-dev 
COPY --from=build-stage-dev /app/build /usr/share/nginx/html 
EXPOSE 80 
STOPSIGNAL SIGTERM 
CMD ["nginx", "-g", "daemon off;"]

FROM ${NGINX_IMAGE} as deploy-stage-prod 
ENV NODE_ENV production 
COPY --from=build-stage-prod /app/build /usr/share/nginx/html 
EXPOSE 80 STOPSIGNAL SIGTERM CMD ["nginx", "-g", "daemon off;"]
```

## Analysing the Current Dockerfile:
The first step in minimising docker build time is to analyse the current dockerfile for potential bottlenecks or unnecessary steps. By identifying and eliminating these inefficiencies, we can significantly reduce the overall build time.

```dockerfile
FROM node:latest
WORKDIR /app 
COPY . . // <--- This is the first bottleneck, as it copies all files including node_modules
RUN yarn install // <--- This is the second bottleneck, as it installs all dependencies
ENV DISABLE_ESLINT_PLUGIN=true NODE_ENV=production  
RUN yarn run build // <--- This is the third bottleneck, as it builds the application
EXPOSE 3000 
CMD [ "yarn", "start" ] // <--- This is the fourth bottleneck, as it starts the application using yarn
```

## Optimising the Order of Steps:
Next, we can optimise the order of steps in the dockerfile to minimise build time. By rearranging the steps based on their dependencies and avoiding unnecessary repetition, we can streamline the build process and reduce the time it takes to create the docker image.

## Utilising Multi-Stage Builds:
One effective technique to minimise build time is to use multi-stage builds. This approach involves separating the build environment from the production environment, resulting in a smaller final image size. By discarding unnecessary build dependencies and only including essential components in the production image, we can further optimise the build process.

```dockerfile
# Build Stage
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN yarn install 
ENV DISABLE_ESLINT_PLUGIN=true NODE_ENV=production  
RUN yarn run build

# Production Stage
FROM node:latest
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000 
CMD [ "yarn", "start" ]
```

## Caching Techniques:
Caching plays a crucial role in reducing build time. By utilising caching techniques, we can avoid re-installing dependencies that have not changed since the last build. This significantly speeds up the build process, especially when dealing with large dependencies.

## Using Lightweight Base Images:
Another way to minimise docker build time is to consider using lightweight base images. By selecting a base image that is specifically designed for efficiency and minimal footprint, we can further reduce the size of the docker image. This not only speeds up the build process but also improves the overall performance of the application.

```dockerfile
# Build Stage
FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN yarn install 
ENV DISABLE_ESLINT_PLUGIN=true NODE_ENV=production  
RUN yarn run build

# Production Stage
FROM node:alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000 
CMD [ "yarn", "start" ]
```

## Testing and Documentation:
After implementing the aforementioned optimisations, it is essential to thoroughly test the new dockerfile build process. This ensures that it meets the acceptance criteria and performs as expected. Additionally, documenting the changes made and the reasoning behind them is crucial for future reference and troubleshooting.

## Conclusion:
By following these steps to minimise docker build time, developers can significantly enhance their productivity and efficiency. Optimising the dockerfile build process not only saves time but also improves the overall development workflow. With a streamlined and efficient build process, developers can focus more on developing and testing their applications, leading to faster iterations and better software quality.