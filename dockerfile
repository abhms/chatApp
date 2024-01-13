# Use an official Node.js runtime as a base image
FROM node:21.1.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install the app dependencies
RUN npm install

# Copy the current directory contents to the container at /app
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run" ,"dev"]