## 📄 14 - Most Used Docker Commands

### 🎯 Goal:

A quick reference for the most frequently used Docker and Docker Compose commands by developers and system administrators.

---

### 🐳 Docker CLI Commands

#### 🔹 Images

```bash
docker images                    # List all local images
docker rmi <image>               # Remove image by ID or name
docker pull <image>              # Download image from Docker Hub
docker build -t <tag> .          # Build image from Dockerfile
docker tag <img> <repo:tag>      # Tag image with a new name
```

#### 🔹 Containers

```bash
docker ps                        # List running containers
docker ps -a                     # List all containers
docker run <image>               # Run container from image
docker run -it <image>           # Run interactively (bash, sh)
docker run -d -p 3000:3000 <img> # Run in detached mode with port mapping
docker stop <container>          # Stop container
docker rm <container>            # Remove container
docker exec -it <container> sh   # Enter running container
```

#### 🔹 Volumes & Networks

```bash
docker volume ls                 # List volumes
docker volume rm <vol>           # Remove volume
docker network ls                # List networks
docker network inspect <net>     # Inspect network
docker network create <net>      # Create custom network
```

#### 🔹 System Cleanup

```bash
docker system prune              # Remove all unused containers, networks, images (with prompt)
docker image prune               # Remove unused images only
docker container prune           # Remove stopped containers
```

---

### 📦 Docker Compose Commands

#### 🔸 General

```bash
docker-compose up                # Start all services
docker-compose up -d             # Start in detached mode
docker-compose up --build        # Force rebuild before up
docker-compose down              # Stop and remove containers
docker-compose down -v           # Also remove volumes
docker-compose build             # Build images defined in Compose
```

#### 🔸 Maintenance & Debugging

```bash
docker-compose ps                # Show running services
docker-compose logs              # Show logs
docker-compose logs -f           # Follow logs live
docker-compose exec <svc> sh     # Enter service container
```

#### 🔸 Utilities

```bash
docker-compose config            # Validate and view merged config
docker-compose restart           # Restart services
docker-compose stop              # Stop services
docker-compose start             # Start stopped services
```

---

### 🧠 Tips & Notes 

* لو بتواجه مشكلة في اللوجز، دايمًا استخدم `logs -f`.
* لو عدلت في Dockerfile أو package.json استخدم `--build`.
* `docker-compose down -v` مهم لو بتواجه مشكلة في Volume قديم بيخزن داتا مش محدثة.
* `exec -it` بيخليك تدخل جوه الكونتينر كأنك فاتح terminal.
* لو نسيت اسم الكونتينر أو الصورة استخدم `docker ps`, `docker images`.
* استخدم `docker network inspect` عشان تتأكد إن الكونتينرات متصلة ببعض.
* `docker-compose config` بيساعدك تكتشف أخطاء التهيئة (YAML errors).

> 📌 خلي الملف ده مرجع سريع لأي مشروع بتشتغل عليه. بنضيف عليه باستمرار.
