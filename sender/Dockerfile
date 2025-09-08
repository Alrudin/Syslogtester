FROM node:20 AS frontend-build
WORKDIR /frontend
COPY frontend ./frontend
WORKDIR /frontend/frontend
RUN npm install && npm run build

FROM python:3.11
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Copy built React app to the location Flask expects
COPY --from=frontend-build /frontend/frontend/dist ./frontend/dist
CMD ["python", "app.py"]
