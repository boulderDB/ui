# Base on offical Node.js Alpine image
FROM node:16-alpine

RUN apk add libressl-dev

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json .npmrc ./

# Install dependencies
RUN npm ci --omit=dev

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Open permissions
RUN chmod -R 777 .next

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "npm", "start" ]