# 🧱 Docker Images & Containers

Understanding **Docker Images** and **Containers** is foundational for any DevOps engineer or developer working with Docker. This section provides a technical yet concise overview of how they work, with commands and real-world usage.

---

## 🧩 1. Docker Image

### 🔹 Definition

A **Docker Image** is a **read-only template** that contains the application code, runtime, libraries, environment variables, and configuration files needed to run your application.

📝 *ملاحظة: الصور لا يمكن التعديل عليها مباشرة. لو عايز تغيّر حاجة، بتعمل build جديدة.*

### ✅ Key Characteristics

* Created from a `Dockerfile`
* Immutable (read-only)
* Stored in image registries like Docker Hub
* Acts as a blueprint to create containers

### 📦 Example

```bash
docker pull node:14
```

This command pulls the Node.js v14 base image from Docker Hub.

---

## 🚀 2. Docker Container

### 🔹 Definition

A **Container** is a runnable instance of an image. It includes everything needed to run the app and runs in an isolated environment.

📝 *بتشتغل الحاوية على نظام التشغيل المضيف (host) ولكن بشكل معزول، وده اللي بيديها السرعة والخفة.*

### ✅ Key Characteristics

* Created from an image
* Has a writable layer
* Lightweight and fast
* Can be started, stopped, removed, or restarted easily

### 📦 Example

```bash
docker run --name my-node-app -p 3000:3000 node:14
```

This runs a container using the Node.js v14 image, and maps port 3000 on the host to port 3000 in the container.

---

## 🔧 3. Basic Docker Commands

### 📥 Pull an Image

```bash
docker pull <image_name>
```

### 📤 Push an Image to a Registry

```bash
docker push <your_username>/<image_name>
```

### 🛠️ Build an Image from Dockerfile

```bash
docker build -t myapp:latest .
```

### 🚦 Run a Container

```bash
docker run -d -p 8080:80 --name webserver nginx
```

### ⏹️ Stop & Remove a Container

```bash
docker stop webserver
```

```bash
docker rm webserver
```

### 🗑️ Remove an Image

```bash
docker rmi nginx
```

---

## 🔍 4. Inspecting Images & Containers

### 📦 List Images

```bash
docker images
```

### 📋 List Running Containers

```bash
docker ps
```

### 📋 List All Containers (including stopped)

```bash
docker ps -a
```

### 🔍 Inspect Container Details

```bash
docker inspect <container_id>
```

### 📂 View Container Logs

```bash
docker logs <container_id>
```

---

## 🧠 Pro Tips

* Use small base images like `alpine` for lightweight containers
* Tag images with meaningful versions: `myapp:v1.0.0`
* Create a `.dockerignore` file to exclude unnecessary files
* Clean up unused resources:

```bash
docker system prune
```

📝 *حافظ على الصور والحاويات منظمة لتسهيل الـ CI/CD والديبلاي.*

---

## 💼 Real-World Scenario

Let’s say you built a Node.js app. To run it anywhere reliably:

1. Create a `Dockerfile`
2. Build the image:

```bash
docker build -t my-node-app .
```

3. Run the container:

```bash
docker run -p 3000:3000 my-node-app
```

✅ *Same app, same behavior — whether on your laptop or in the cloud.*

---

## ✅ Summary

| Concept        | Description                        |
| -------------- | ---------------------------------- |
| Image          | Read-only blueprint for containers |
| Container      | Runnable instance of an image      |
| `docker run`   | Runs a container                   |
| `docker ps`    | Lists running containers           |
| `docker build` | Creates an image from a Dockerfile |

---
