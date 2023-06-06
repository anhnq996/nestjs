# Use a Node.js base image
FROM node:14-alpine
ARG APP_ENV=production
# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

RUN if [ "$APP_ENV" = "local" ] ; then npm i; else npm i --only=production; fi

# Expose the port on which your Nest.js application listens
EXPOSE 3000

# Set the command to start your Nest.js application
CMD ["npm", "run", "start:prod"]