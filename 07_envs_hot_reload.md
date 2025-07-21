# 🌍 Environments & Hot Reload in Docker

Managing environments (local, dev, prod) and enabling hot reload is essential for a smooth developer experience while using Docker.

---

## 🧪 Why Use Different Environments?

Different environments serve different purposes:

- **Local**: For development with debugging, hot reload, etc.
- **Development (Staging)**: Mimics production for testing.
- **Production**: Optimized and secured for deployment.

Each environment can have its own config, volumes, and Dockerfiles.

---

## 📁 Typical Setup

```
my-app/
├── docker-compose.yml
├── docker-compose.override.yml     # for local dev
├── docker-compose.prod.yml         # for production
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev              # enables hot reload
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
└── .env
```

---

## 🔁 Hot Reload with Bind Mounts

In development, use **bind mounts** to sync code from host to container:

```yaml
volumes:
  - .:/app
```

> ⚠️ Don't use bind mounts in production.

### Backend Example (Node.js)

```Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon && npm install
COPY . .
CMD ["nodemon", "server.js"]
```
---

### Docker Compose

Docker Compose is a tool for defining and running **multi-container Docker applications** using a simple YAML file.

---

## 📦 Why Docker Compose?

In real-world applications, you often need more than one container (e.g., backend, frontend, database). Instead of running each one manually, Compose allows you to **define all services** in one file and start them with a single command.

---
### docker-compose.override.yml

```yaml
services:
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
```

---

## 🚀 Switching Between Environments

### 🔧 Local Dev (default override)
```bash
docker-compose up
```

### 🧪 Dev / Staging
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### 🏁 Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

> 📌 Always use `-f` to specify custom environment setups.

---

## 💡 Tips (نصائح مهمة)

- استخدم `Dockerfile.dev` لتفعيل hot reload بدون الحاجة لإعادة build.
- استخدم `nodemon`, `webpack-dev-server`, أو أي dev server مناسب للغة المشروع.
- نظم متغيرات البيئة في `.env` file منفصل حسب كل بيئة.
- استخدم `docker-compose.override.yml` كبيئة افتراضية أثناء التطوير.

---

## 📚 References

- [Docker Bind Mounts](https://docs.docker.com/storage/bind-mounts/)
- [Compose Override Files](https://docs.docker.com/compose/extends/)
- [Hot Reload in Node.js](https://nodemon.io/)

---
