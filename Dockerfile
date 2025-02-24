FROM --platform=linux/arm64 node:20.13.1-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files first (leveraging Docker layer caching)
COPY package.json yarn.lock ./

# Install dependencies using frozen lockfile for consistency
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Use a lightweight runtime image for production
FROM --platform=linux/arm64 node:20.13.1-alpine

WORKDIR /app

# Copy only necessary build artifacts from the previous stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]