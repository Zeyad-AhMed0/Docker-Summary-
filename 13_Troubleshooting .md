## 🛠️ 13 - Common Docker Problems & How We Solved Them

### 🎯 Goal:

Document real-world issues you might face while working with Docker — especially during development — and how to fix them.

---

### 🐳 1. File Sync Issues (Hot Reload Not Working)

#### ✅ Problem:

Code changes in your editor are not reflected inside the container.

#### 💡 Solution:

Use **bind mounts** instead of copy-only:

```yaml
volumes:
  - ./src:/app
```

Make sure your app uses a watcher like `nodemon`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

> 📌 ملاحظة: أحيانًا WSL على ويندوز بيعمل مشاكل في sync، وقتها restart لل Docker بيحل المشكلة.

---

### ⚠️ 2. Port Already in Use

#### ✅ Problem:

```
Error starting userland proxy: listen tcp 0.0.0.0:3000: bind: address already in use
```

#### 💡 Solution:

* Use a different host port in Docker Compose.
* Or stop the local process using it:

```bash
lsof -i :3000
kill <PID>
```

---

### 🧱 3. MongoDB Container Crashing

#### ✅ Problem:

```
Error: data directory /data/db not found or accessible
```

#### 💡 Solution:

Ensure volume mapping is correct:

```yaml
volumes:
  - mongo-data:/data/db
```

And permissions are valid.

> 📌 ملحوظة: ساعات بيحصل conflict لو كنت مشغل Mongo على الجهاز المحلي، اقفلها قبل ما تشغل الـ container.

---

### 🔄 4. Changes Not Applied After `docker-compose up`

#### ✅ Problem:

You make changes but nothing updates.

#### 💡 Solution:

* Use `--build` flag:

```bash
docker-compose up --build
```

* Or rebuild manually:

```bash
docker-compose build && docker-compose up
```

---

### 🧱 5. docker-compose.yml Errors (YAML validation)

#### ✅ Problem:

```
additional properties 'mongo' not allowed
```

أو

```
volumes must be a mapping
```

#### 💡 Solution:

* اتأكد إن كل block في `services:` معرف صح.
* كل key في YAML لازم يكون عنده indentation صحيح (spaces, مش tabs).
* لو بتستخدم volumes:

```yaml
volumes:
  mongo-data:
```

> ✅ لازم يكون `mongo-data:` object مش string أو list.

---

### 📦 6. Logs Not Showing or You Want to Monitor Mongo

#### ✅ Problem:

عايز تشوف الـ logs بتاعة Mongo أو Express app.

#### 💡 Solution:

```bash
docker-compose logs mongo
docker-compose logs express-app
```

> أو تقدر تستخدم `-f` لمتابعة مستمرة:

```bash
docker-compose logs -f mongo
```

---

### 🧼 7. Volume Data Not Resetting

#### ✅ Problem:

بعد ما تعدل في DB أو config، البيانات القديمة بتفضل موجودة.

#### 💡 Solution:

* Remove containers and volumes:

```bash
docker-compose down -v
```

* أو احذف volume معين:

```bash
docker volume rm your_volume_name
```

---

### 🐳 8. Container Doesn't Start (Silent Fail)

#### ✅ Problem:

تشغل `docker-compose up` ومفيش Error، بس السيرفر مش شغال.

#### 💡 Solution:

* راجع logs:

```bash
docker-compose logs <service-name>
```

* أو افتح container:

```bash
docker exec -it <container> sh
```

وتشيك إيه اللي حصل manually.

---

### 🔁 9. Old Image Being Used

#### ✅ Problem:

حتى بعد التعديل في `Dockerfile`، بيتشغل image قديم.

#### 💡 Solution:

* امسح الصور القديمة:

```bash
docker image prune -a
```

* أو تأكد من `--build` في كل مرة:

```bash
docker-compose up --build
```

---

### 🌐 10. Can't Connect to Mongo from Express

#### ✅ Problem:

Express app مش قادر يـ connect على MongoDB في نفس الـ network.

#### 💡 Solution:

* استخدم اسم السيرفيس في `docker-compose` كـ hostname:

```js
mongodb://mongo:27017/dbname
```

مش `localhost`.

---

### 🔎 11. Useful Debugging Tools

* `docker logs <container>` — show logs
* `docker exec -it <container> sh` — enter container
* `docker-compose ps` — see running services
* `docker-compose down -v` — stop & remove volumes if needed
* `docker-compose config` — validate and view merged compose config
* `docker volume ls` — list volumes
* `docker network ls` — list networks

---

### 🧠 Summary

كل المشاكل دي واقعية واتقابلنا بيها، وتعلمنا منها. التوثيق بيخلي أي فريق يشتغل أسرع وأسهل. خليك دايمًا موثق الحلول اللي بتقابلك عشان ما تقعش فيها تاني 😉
---
