# Base image: lightweight nginx web server
FROM nginx:alpine

# Copy pre-built dist folder
COPY dist/ /usr/share/nginx/html/

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Document that the container listens on port 80
EXPOSE 80

# Run nginx in the foreground so the container keeps running
CMD ["nginx", "-g", "daemon off;"]
