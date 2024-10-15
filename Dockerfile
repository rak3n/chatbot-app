# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight Node image to serve the app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the build folder from the previous stage
COPY --from=0 /app/build ./build

# Install serve to run the application
RUN npm install -g serve

# Set the command to start the server
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000
EXPOSE 3000