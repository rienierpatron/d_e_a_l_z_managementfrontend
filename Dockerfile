# Use a base image with support for multi-architecture
FROM --platform=linux/arm64 node:20.13.1

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port that your app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]