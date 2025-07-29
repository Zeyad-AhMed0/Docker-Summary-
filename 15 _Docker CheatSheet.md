## 📄 15 - Docker CheatSheet (Quick Tips & Shortcuts)

### 🎯 Goal:

A compact, fast-access cheatsheet for daily Docker use. Suitable for beginners and intermediate users.

---

### 📌 Common Dockerfile Instructions

```Dockerfile
FROM node:20-alpine        # Base image
WORKDIR /app               # Set working directory
COPY . .                   # Copy project files
RUN npm install            # Install dependencies
EXPOSE 3000                # Expose port for container
CMD ["node", "index.js"]    # Start app
```

---

### ⚙️ Docker Container Lifecycle

```bash
docker build -t myapp .            # Build image from Dockerfile
docker run -p 3000:3000 myapp      # Run image

docker start <container>           # Start existing container
docker stop <container>            # Stop running container
docker restart <container>         # Restart container
docker rm <container>              # Remove container
docker image prune                 # Remove unused images
```

---

### 🛠️ Build & Compose

```bash
docker-compose up --build -d       # Build and run in background
docker-compose down                # Stop & remove containers

docker-compose exec app sh         # Open shell inside container
```

---

### 🔍 Troubleshooting

```bash
docker logs <container>            # View logs
docker inspect <container/image>  # Low-level details
docker stats                       # Live resource usage
docker top <container>             # Running processes
```

---

### 🧠 Useful Aliases (اختصارات ممكن تضيفها للـ .bashrc أو .zshrc)

```bash
alias d='docker'
alias dc='docker-compose'
alias dps='docker ps'
alias dcu="docker-compose up -d"
alias dcd="docker-compose down"
```

---

### 🧠 Notes (ملاحظات بالعربي)

* لازم دايمًا تكتب `EXPOSE` في Dockerfile عشان توثق البورت، حتى لو مش مطلوب.
* لو بتعمل Debug ابدا بـ `logs` و `exec sh`.
* أحسن طريقة تشتغل بيها هي إنك تفصل بين Dev و Prod باستخدام `.env` و Docker Compose profiles.
* استخدم `--volumes` مع `down` لما تحس إن البيانات القديمة مأثرة على سلوك الكونتينر.

> 🧾 الملف ده مرجع سريع هيساعدك تفتكر كل حاجة وانت شغال من غير ما ترجع تدور في Docs.
