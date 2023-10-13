# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /SERVER

# Copy your Node.js application files to the container
COPY . ./
RUN npm install

# Copy your Python script and requirements to the container
# COPY py_script.py requirements.txt ./

# Install Python and Python dependencies
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install --no-cache-dir -r requirements.txt

# # Expose the port your Node.js app is listening on
# EXPOSE 3000

# Start your Node.js application
CMD ["node", "index.js"]
