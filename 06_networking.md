## 🧭 Docker Networking

Networking in Docker allows containers to communicate with each other, the host machine, and the external network. This is a key part of building scalable microservices or container-based applications.

> 💡 **Note:** Networking is critical for multi-container setups like microservices.

---

### 📦 Default Networks in Docker

Docker installs with a few default networks:

| Network Name | Type   | Description |
|--------------|--------|-------------|
| `bridge`     | Bridge | Default network – each container gets an internal IP |
| `host`       | Host   | The container shares the host network stack |
| `none`       | Null   | No networking at all |

📌 Check existing networks:
```bash
docker network ls
```

> 🔸 **معلومة:** `bridge` هو الوضع الافتراضي، لكن مش بيسمح بالحاويات تتكلم بالاسم إلا لو في شبكة مخصصة.

---

### 🧱 Bridge Network (Default)

- Containers are isolated and get private internal IPs.
- Internal DNS allows communication by container names **only inside custom bridge networks**.

```bash
docker run -d --name app1 --network bridge nginx
```

> ⚠️ Unless using a custom bridge network, name-based communication won’t work.

---

### 🔌 Create a Custom Bridge Network

Creating a user-defined bridge network allows containers to discover each other by name:

```bash
docker network create my_network
```

```bash
docker run -d --name backend --network my_network node:alpine
docker run -d --name frontend --network my_network nginx
```

✅ `frontend` can reach `backend` via `http://backend:PORT`

> 📝 **ملاحظة:** الشبكة المخصصة بتدي DNS داخلي للحاويات، مفيد لو بتبني Microservices.

---

### 🧩 Container-to-Container Communication

| الحالة | هل ممكن يتواصلوا؟ |
|--------|--------------------|
| نفس الشبكة | ✅ Yes |
| شبكات مختلفة | ❌ No (unless you manually connect them) |

```bash
docker network connect my_network another_container
```

> 🧠 استخدم `docker network inspect` لو عايز تعرف مين فين.

---

### 🌐 Host Network Mode

- Container shares the host’s network directly.
- No network isolation.
- No need to publish ports (`-p`).

```bash
docker run --network host nginx
```

> ⚠️ **Works only on Linux.** Not supported in Docker Desktop (Windows/Mac).

---

### 🚫 None Network Mode

- Completely disables networking.

```bash
docker run --network none busybox
```

> 🔒 مفيد للتطبيقات اللي مش محتاجة إنترنت أو اتصال خارجي.

---

### 🔧 Inspect Network

To view detailed info about a network:
```bash
docker network inspect my_network
```

> 🔍 هتعرف الـ IPs، أسماء الحاويات، وأنواع الاتصال.

---

### 🌍 Expose Ports to Host

If you want to access the app from your browser:
```bash
docker run -p 8080:3000 my-app
```

This maps:
```
localhost:8080 → container:3000
```

> 📝 **ملاحظة:** استخدام `-p` بيخلي التطبيق متاح من الـ browser.

---

### 🔄 Docker Compose Networking

All services in a `docker-compose.yml` file automatically join a shared default network.

```yaml
services:
  backend:
    image: node:alpine
  frontend:
    image: nginx
    depends_on:
      - backend
```

In this case, `frontend` can reach `backend` at `http://backend:PORT`

> ✅ الأسماء في Compose تعتبر DNS names تلقائيًا.

---

### 🛡️ Use Case Summary

| Use Case                      | Best Practice                           |
|------------------------------|-----------------------------------------|
| Container-to-Container       | Use custom bridge (no `-p` needed)      |
| Access from browser/host     | Use `-p` to map ports                   |
| No networking needed         | Use `--network none`                    |
| Maximum performance (Linux)  | Use `--network host`                    |

---

### 🧠 Quick Recap

- Custom bridge networks enable name-based communication.
- Use `-p` to expose services to host/localhost.
- Compose simplifies networking using service names.

---
