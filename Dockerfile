FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_ENABLE_MOCK_API=true
ARG VITE_ENABLE_DEMO_CONTROLS=true
ENV VITE_ENABLE_MOCK_API=${VITE_ENABLE_MOCK_API}
ENV VITE_ENABLE_DEMO_CONTROLS=${VITE_ENABLE_DEMO_CONTROLS}

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1