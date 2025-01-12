# Step 1: Use Node.js LTS as the base image
FROM node:lts

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm ci || npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 5000

# Step 7: Define the command to run the application
CMD ["npm", "start"]