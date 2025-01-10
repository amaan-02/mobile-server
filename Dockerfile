# Step 1: Use the official Node.js image (LTS version)
FROM node:lts

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the port your app will run on (adjust the port as necessary)
EXPOSE 3000

# Step 7: Command to run the application
CMD ["npm", "start"]
