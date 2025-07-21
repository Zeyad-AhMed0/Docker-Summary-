# 🧹 Docker Compose

Docker Compose is a tool for defining and running **multi-container Docker applications** using a simple YAML file.

---

## 📦 Why Docker Compose?

In real-world applications, you often need more than one container (e.g., backend, frontend, database). Instead of running each one manually, Compose allows you to **define all services** in one file and start them with a single command.

> 🌟 Example: Web App = Node.js + MongoDB + Redis. Compose lets you manage them all together.

---

## 📁 File Structure

Typically, your project will look like this:

```
my-app/
├── docker-compose.yml
├── docker-compose.override.yml
├── docker-compose.prod.yml
├── backend/
│   └── Dockerfile
├── frontend/
│   └── Dockerfile
└── .env
```

---

## ⚙️ Basic Syntax of `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api

  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DB_HOST=mongo
    depends_on:
      - mongo

  mongo:
    image: mongo
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

> ✅ **معلومة:** `depends_on` doesn't wait for container to be ready—only for it to start.

---

## 🚀 Useful Commands

| Command | Description |
|--------|-------------|
| `docker-compose up` | Build & start all services |
| `docker-compose up -d` | Start in detached mode (background) |
| `docker-compose down` | Stop and remove containers, networks, volumes |
| `docker-compose ps` | List running services |
| `docker-compose build` | Manually build the images |
| `docker-compose logs` | View service logs |
| `docker-compose exec SERVICE bash` | Exec into a running container |

> 🔧 Compose automatically reads `.env` file in the project root.

---

## 🧪 Tip: Use `.env` with Compose

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/app
```

```yaml
environment:
  - MONGO_URI=${MONGO_URI}
```

---

## 🔄 Managing Multiple Compose Files

You can use **multiple Compose files** to separate configurations by environment or by concern (e.g., base config, production config, testing config).

### 🔧 File Types:
- `docker-compose.yml`: Base configuration shared across all environments.
- `docker-compose.override.yml`: Automatically applied when you run `docker-compose up` (used for dev setups).
- `docker-compose.prod.yml`: Custom overrides for production (manually specified).

### 🔄 How to Combine:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

The files are merged **from left to right**, so later files override earlier ones.

> 📌 You can use this to override volumes, build context, environment variables, etc.

### 💼 Example for Production:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 🧠 Best Practices:
- Keep sensitive values in `.env` or secret manager
- Split services into logical groups if needed
- Use labels for organizing or monitoring
- Define profiles to group services conditionally

```yaml
profiles:
  - monitoring
```

And run with:
```bash
docker-compose --profile monitoring up
```

---

## 🏗️ Multi-Stage Dockerfiles

Multi-stage builds allow you to use **multiple `FROM` statements** in a Dockerfile to separate build logic from runtime.

### 🧱 Example: Node.js Frontend

```Dockerfile
# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

### ✅ Benefits:
- **Smaller final image size**: Only runtime code is included.
- **Security**: Dev dependencies & secrets aren’t shipped.
- **Speed**: Smaller images push & pull faster.

### 🔐 Advanced Use:
You can even add intermediate stages for testing, linting, or dependency caching.

```Dockerfile
# Stage 0: Lint
FROM node:20 AS lint
WORKDIR /app
COPY . .
RUN npm run lint

# Stage 1: Build
FROM node:20 AS build
...
```

> 🛡️ Useful when working in CI/CD pipelines or when performance matters.

---

## 💡 Notes (ملاحظات مهمة):

- استخدم `volumes` لحفظ البيانات بين تشغيلات الكونتينر.
- استخدم `override` و `prod` files لتنظيم البيئات.
- استخدم multi-stage Dockerfile لتقليل حجم الصورة النهائية.
- لتسهيل الإدارة، أنشئ سكربتات `make` أو bash scripts لتشغيل الأوامر المعقدة.
- يفضل إنشاء ملف `Makefile` أو `run.sh` يضم كل الأوامر التي تستخدمها بشكل متكرر.

---

## 📚 References

- [Official Docker Compose Docs](https://docs.docker.com/compose/)
- [Compose Specification](https://compose-spec.io)
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

---
