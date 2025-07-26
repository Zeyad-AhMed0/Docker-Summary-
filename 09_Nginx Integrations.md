## 🚀 Docker Integrations: Nginx, MongoDB, Redis

In this section, we explore how to integrate **Nginx** with your containerized applications and how to link **databases like MongoDB and Redis** using Docker. 

> 💡 **Note (معلومة):** Nginx is commonly used as a reverse proxy to route requests to backend containers. Redis and MongoDB are used for caching and data storage respectively.

---

### 🧭 Nginx as a Reverse Proxy

Nginx is often used to handle incoming HTTP requests and route them to backend services like Node.js apps.

#### 🔧 Full Example: `nginx.conf`
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://app:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> 📌 **ملاحظة:** بدل `localhost`، استخدم اسم الـ container (`app` في المثال).

#### 🐳 Compose Integration:
```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: app
    expose:
      - 4000

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app
```

> ✅ استخدم `expose` لو الاتصال داخلي، واستخدم `ports` لما تحتاج توصل من الـ host.

---

### 🗃️ MongoDB with Docker

MongoDB is a NoSQL database that stores data in JSON-like documents.

#### 🔨 Run MongoDB Container:
```bash
docker volume create mongo-data

docker run -d \
  --name mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo
```

> 📝 **معلومة:** استخدام volume بيحافظ على البيانات لو الحاوية اتقفلت أو اتمسحت.

#### 🔗 Connect to MongoDB (Node.js):
```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
```

> ✅ `mongo` هو اسم الحاوية في نفس الشبكة، فبيشتغل كـ hostname.

---

### ⚡ Redis with Docker

Redis is an in-memory key-value store, commonly used for caching and session storage.

#### 🔨 Run Redis Container:
```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis
```

#### 🔗 Connect to Redis (Node.js):
```js
const redis = require("redis");
const client = redis.createClient({
  url: "redis://redis:6379"
});

client.connect();
```

> 💡 Redis مناسب لتخزين الـ sessions أو تنفيذ عمليات caching.

---

### 📦 Docker Volumes (Persistence)

Docker volumes are used to persist data outside the container's lifecycle.

#### 🔧 Common Commands:
```bash
docker volume create mongo-data
docker volume ls
docker volume inspect mongo-data
docker volume rm mongo-data
```

> 📌 مهم جدًا تستخدم volumes مع قواعد البيانات لحفظ البيانات.

---

### 🧠 Summary Table

| Tool     | Use Case                         | How to Use In Docker                          |
|----------|----------------------------------|-----------------------------------------------|
| Nginx    | Reverse proxy & routing          | Use config with proxy_pass + `depends_on`     |
| MongoDB  | Persistent JSON-like storage     | Mount volume + connect via `mongodb://` URL   |
| Redis    | Caching / session management     | Connect via `redis://` URL                    |

---

> 📎 **ملاحظات أخيرة:**
> - لو بتستخدم Docker Compose، تأكد كل الخدمات في نفس الشبكة (default).
> - سمي الحاويات بأسماء مفهومة واستخدمها كـ hostnames للتوصيل بينهم.
> - دايمًا افصل البيانات عن الحاويات نفسها باستخدام volumes.
