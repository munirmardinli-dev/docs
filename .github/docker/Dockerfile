# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7
ARG NGINX_VERSION=stable

ARG VERSION

FROM nginx:${NGINX_VERSION}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV UID=1026
ENV GID=100
ENV NEXT_PUBLIC_UI_URL=https://docs.homelab-prod.synology.me
ENV ACCESS_LOG=/var/log/nginx/access.log
ENV ERROR_LOG=/var/log/nginx/error.log
ENV VERSION=${VERSION}

COPY docs-app/out /usr/share/nginx/html
