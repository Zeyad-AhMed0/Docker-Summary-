## 🚀 11 - Deploying Dockerized Apps to Production

### 🧠 Goal:

Learn how to deploy your Docker-based application in a secure, optimized production environment.

> 🎯 **الهدف بالعربي**: تعرف إزاي تنشر تطبيق معمول بـ Docker في بيئة Production بشكل آمن ومحسّن للأداء.

---

### 📦 1. Build Production-Ready Docker Image

✅ في مرحلة الـ Production، محتاج تعمل Dockerfile خفيف وسريع، فيه:

* Base Image خفيف زي `node:alpine`
* تستبعد أي devDependencies
* تحدد `NODE_ENV=production`

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production

CMD ["node", "index.js"]
```

> 🔍 ملاحظة: `--omit=dev` بتخلي npm يتجاهل الـ dev dependencies أثناء الـ install.

---

### 🔐 2. Use .env and Secrets

⚠️ بلاش تحط بيانات حساسة في الكود مباشرة. استخدم `.env` أو Docker Secrets.

```bash
# .env
PORT=3000
MONGO_URL=mongodb://mongo:27017/mydb
```

داخل Docker Compose:

```yaml
services:
  app:
    env_file:
      - .env
```

> 📌 كده الـ app هيقرأ المتغيرات من ملف `.env` بدل ما تكون في الكود.

---

### 📂 3. Production Docker Compose

جهز ملف اسمه `docker-compose.prod.yml` مخصوص للإنتاج:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:3000"
    restart: always
    env_file:
      - .env
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

> 🧱 استخدم `restart: always` علشان الحاوية تشتغل تلقائيًا لو وقعت.

---

### 🔄 4. Run the Prod Setup

شغل المشروع في بيئة الإنتاج:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

> ✅ استخدم `-d` لتشغيله في الخلفية، و `--build` لإعادة بناء الصورة.

---

### 📈 5. Monitor & Logging

راقب أداء الحاويات باستخدام:

* `docker logs <container>` لعرض اللوجز
* `docker stats` لمتابعة استهلاك الموارد
* أدوات خارجية زي Prometheus + Grafana للأنظمة الكبيرة

---

### ☁️ 6. Host it

#### 🖥️ Option 1: VPS (مثال: DigitalOcean, Linode)

* ثبت Docker + Compose على السيرفر
* اعمل Clone للريبو
* شغل ملف الإنتاج

#### 🐳 Option 2: Docker Swarm أو Kubernetes

* استخدم `docker swarm init` + `docker stack deploy` لو عايز تعمل scaling
* Kubernetes مناسب للأنظمة الكبيرة (زي GKE, EKS...)

#### 📦 Option 3: Render أو Railway أو Fly.io

* منصات Cloud بتدعم Dockerfile بشكل مباشر وسهل الاستخدام

---

### 🛡️ 7. Extra Tips

🔐 شوية نصائح مهمة:

* استخدم `nginx` كـ Reverse Proxy مع SSL (Let’s Encrypt)
* فعّل Health Checks في Docker Compose
* استخدم Image Tags زي `myapp:v1.0.0`
* فعل auto-restart باستخدام `restart: always`

---

### ✅ Summary

You now have a clear path to deploy your Dockerized application in production using Compose or cloud-native solutions.

> 🧾 **تلخيص**: دلوقتي تقدر تنشر تطبيقك بـ Docker سواء على VPS أو Cloud Platforms، وتأمنه وتراقبه صح.
