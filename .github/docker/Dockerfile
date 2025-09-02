# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NGINX_VERSION=stable
ARG NODE_ENV
ARG NEXT_PUBLIC_UI_URL
ARG NEXT_PUBLIC_HEADER_TITEL
ARG NEXT_PUBLIC_GIT_REPO_URL

FROM nginx:${NGINX_VERSION} as nginx

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_UI_URL=${NEXT_PUBLIC_UI_URL}
ENV NEXT_PUBLIC_HEADER_TITEL=${NEXT_PUBLIC_HEADER_TITEL}
ENV NEXT_PUBLIC_GIT_REPO_URL=${NEXT_PUBLIC_GIT_REPO_URL}

COPY /docs-app/out /usr/share/nginx/html

LABEL maintainer="Munir Mardinli <munir@mardinli.de>"
