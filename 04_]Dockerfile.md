## 🐳 04 - Dockerfile

### 🎯 Goal:

Understand how to write a professional `Dockerfile` to build a containerized environment for any app — with support for **multiple environments** (development / production) and **hot reload** during development.

---

### 📦 What is a Dockerfile?

A `Dockerfile` is a text file that contains a set of instructions to define how a Docker image should be built.

💡 *معلومة:* الملف دا بيكون المصدر الرئيسي اللي Docker بيعتمد عليه علشان يعمل Build للـ Image.

---

### 🧱 Basic Structure of a Dockerfile

```Dockerfile
# 1. Set the base image
FROM node:18

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy project files
COPY . .

# 6. Expose the app port
EXPOSE 4000

# 7. Default command
CMD ["npm", "start"]
```

---

### 🌍 Multi-Environment Support (dev / prod)

#### ✅ Method 1: Using ARG and ENV

```Dockerfile
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install --only=dev; \
  else echo "Production mode"; \
fi
```

🏷️ Build with custom environment:

```bash
docker build --build-arg NODE_ENV=development -t my-app-dev .
```

#### ✅ Method 2: Separate Dockerfiles

* `Dockerfile` for production
* `Dockerfile.dev` for development

**Dockerfile.dev:**

```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
```

```bash
docker build -f Dockerfile.dev -t my-app-dev .
```

🧠 *نصيحة:* الطريقة دي أنظف وأسهل في المشاريع الكبيرة.

---

### ♻️ Hot Reload in Docker

Instead of rebuilding the image on every code change, enable hot reload with `nodemon`:

#### ✅ Steps:

1. Install `nodemon` as a dev dependency:

```bash
npm install --save-dev nodemon
```

2. Add this to `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

3. In `Dockerfile.dev`:

```Dockerfile
RUN npm install
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]
```

4. Run with bind mount:

```bash
docker run -p 4000:4000 -v $(pwd):/app my-app-dev
```

📌 On Windows (PowerShell):

```powershell
docker run -p 4000:4000 -v ${PWD}:/app my-app-dev
```

💡 *معلومة:* bind mount بيسمح ليك تشوف التغييرات لحظيًا من غير rebuild.

---

### ✅ Summary:

* `Dockerfile` defines how to build your image.
* You can support multiple environments using `ARG` or separate files.
* Hot Reload is possible using `nodemon` and volume mounts.

📌 For real-world projects, it’s recommended to pair this with `docker-compose.yml` to manage multi-service setups easily.

⬅️ Next: `04_docker_commands.md`
