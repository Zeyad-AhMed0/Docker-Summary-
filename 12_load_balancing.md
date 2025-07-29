## ⚖️ 12 - Load Balancing with Nginx inside Docker

### 🎯 Goal:

Distribute incoming traffic across multiple instances of your app container using Nginx as a reverse proxy inside Docker.

---

### 🧱 1. Why Load Balancing?

* High availability (لو سيرفر وقع التاني شغال)
* Scalability (توزيع الضغط)
* Better resource utilization

---

### 🧪 2. Setup: Multiple App Instances + Nginx

#### 📁 Folder Structure:

```
.
├── nginx/
│   └── default.conf
├── src/
│   └── index.js
├── Dockerfile
├── docker-compose.yml
```

#### 📜 `nginx/default.conf`

```nginx
upstream app {
    server app1:3000;
    server app2:3000;
}

server {
    listen 80;

    server_name localhost;

    location / {
        proxy_pass http://express-node-app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

> ✅ نوجّه Nginx يوزّع الترافيك بين app1 و app2

---

### ⚙️ 3. `docker-compose.yml`

```yaml
version: '3.8'

services:
  app1:
    build: .
    container_name: app1

  app2:
    build: .
    container_name: app2

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app1
      - app2
```

---

### 🚀 4. Run Everything

```bash
docker-compose up --build -d
```

ثم جرّب افتح `http://localhost/` أكتر من مرة وشوف إن الردود بتتبدل بين instance و instance 🎉

---

### 🔍 5. Debugging Tips

* Check container logs: `docker logs <container>`
* Test load balancing manually: `curl http://localhost`
* Modify each app instance to return its name so تعرف مين بيرد

---

### 🧠 Summary

* Nginx can reverse proxy داخل Docker
* تقدر توزع الترافيك بين أكتر من instance
* Load balancing بيساعد في تحقيق أداء أعلى واعتمادية أفضل

> Next: Add Health Checks or SSL with Nginx
