# Base image
FROM node:14

# Set working directory in the container
WORKDIR /app

# Install the `serve` package globally so you can serve your app
RUN npm install -g serve

# Expose the port
EXPOSE 3000
