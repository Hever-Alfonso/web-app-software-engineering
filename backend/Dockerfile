# Base image: Node.js 22 on a slim Debian
FROM node:22-bookworm-slim

# Working folder inside the container
WORKDIR /app

# Run the app in production mode
ENV NODE_ENV=production

# Copy the dependency lists first
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the pre-built JavaScript output
COPY dist ./dist

# Document that the API listens on port 3000
EXPOSE 3000

# Start the compiled Nest.js app
CMD ["node", "dist/main.js"]
