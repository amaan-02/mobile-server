# Step 1: Use the official Node.js image (LTS version)
FROM node:lts

# Step 2: Set the working directory inside the container to /app/server
WORKDIR /app/server

# Step 3: Copy the package.json and package-lock.json from the server folder to the working directory
COPY server/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files from the server folder into the container
COPY server/ ./

# Step 6: Expose the port your app will run on (adjust the port as necessary)
EXPOSE 5000

# Step 7: Command to run the application
CMD ["npm", "start"]