# 🐘 PostgreSQL in Docker

In this section, we explain how to run PostgreSQL inside a Docker container and connect it with both Laravel and Node.js applications using Docker Compose.

We’ll cover:
- What are PostgreSQL and Laravel?
- Running a simple PostgreSQL container
- Setting up Laravel with PostgreSQL using Docker Compose
- Setting up Node.js with PostgreSQL using Docker Compose


---

## 🔍 First: What is PostgreSQL and Laravel?

### 💡 PostgreSQL:
PostgreSQL is a powerful, open-source relational database management system (RDBMS) that supports SQL standards. It also offers advanced features like JSON support, indexing, and extensibility.

> ℹ️ **PostgreSQL** هو نظام قواعد بيانات علائقي مفتوح المصدر، مشهور بقوته ودعمه للـ SQL وكمان بيقدر يخزن بيانات بصيغة JSON ويدعم العمليات المتقدمة.

### 💡 Laravel:
Laravel is a PHP web application framework designed to simplify and structure web development. It includes built-in tools for routing, authentication, and an ORM (Eloquent) to work with databases.

> ℹ️ **Laravel** هو فريمورك بلغة PHP بيستخدمه المطورين لتسهيل بناء تطبيقات الويب، وبيوفر مميزات زي التوجيه (routing)، وإدارة المستخدمين، وربط قواعد البيانات بسهولة.

---

## 🔹 Running a Simple PostgreSQL Container

```bash
docker run --name pg-database \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres
```

> 📝 This command runs a PostgreSQL container on port 5432 with a predefined user and database.
> 
> 📌 الأمر ده بيشغل كونتينر فيه PostgreSQL، وبيحدد يوزر وقاعدة بيانات وباسوورد جاهزين.

---

## ⚙️ Laravel + PostgreSQL with Docker Compose

### 📁 `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
    container_name: laravel-app
    ports:
      - 8000:8000
    volumes:
      - .:/var/www
    depends_on:
      - db
    environment:
      DB_CONNECTION: pgsql
      DB_HOST: db
      DB_PORT: 5432
      DB_DATABASE: laravel_db
      DB_USERNAME: laravel_user
      DB_PASSWORD: laravel_pass

  db:
    image: postgres
    container_name: pg-db
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_DB: laravel_db
      POSTGRES_USER: laravel_user
      POSTGRES_PASSWORD: laravel_pass
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

> 📌 Laravel and PostgreSQL run in isolated containers but communicate over Docker's internal network. The Laravel app connects to the `db` service (PostgreSQL).
> 
> 🔁 الكونتينرين Laravel و PostgreSQL شغالين في نفس الـ network الداخلية وLaravel بيتعرف على PostgreSQL من خلال اسم السيرفيس `db`.

### ⚙️ Laravel `.env`

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass
```

> ✅ Laravel connects to PostgreSQL using these environment variables.
> 
> 📌 Laravel بيقرأ الإعدادات دي من ملف `.env` علشان يربط نفسه بالقاعدة.

### ▶️ Run the Application

```bash
docker-compose up -d --build
```

> 🚀 Build and run all services in the background.
> 
> 🧱 الأمر ده بيبني الكونتينرات ويشغلها في الخلفية.

---

## ⚙️ Node.js + PostgreSQL with Docker Compose

### 📁 Project Structure

```
node-postgres-app/
├── Dockerfile
├── docker-compose.yml
├── db/
│   └── init.sql
└── index.js
```

### 📦 `Dockerfile`

```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

> 🏗️ Defines a lightweight Node.js container that installs dependencies and runs the app.
> 
> 📌 ده Dockerfile بيبني كونتينر فيه Node.js وبيشغل التطبيق.

### ⚙️ `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - 3000:3000
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: node_user
      DB_PASS: node_pass
      DB_NAME: node_db

  db:
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_DB: node_db
      POSTGRES_USER: node_user
      POSTGRES_PASSWORD: node_pass
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  pgdata:
```

> 📄 The `init.sql` file auto-runs to set up initial tables/data.
> 
> 🗂️ ملف `init.sql` بيعمل إعدادات أولية لقاعدة البيانات عند تشغيل الكونتينر لأول مرة.

### 📄 `index.js` Code

```js
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err));
```

> 📌 Simple Node.js code to connect with PostgreSQL using environment variables.
> 
> 📜 الكود ده بيستخدم مكتبة `pg` في Node.js علشان يتواصل مع PostgreSQL.

---

## ✅ Useful Commands

- Check container logs:
  ```bash
  docker-compose logs -f db
  ```

- Access PostgreSQL inside container:
  ```bash
  docker exec -it pg-db psql -U laravel_user -d laravel_db
  ```

> 🔚 Now you've learned how to integrate PostgreSQL with Laravel and Node.js using Docker Compose — all in an organized and practical setup.
> 
> ✅ كده ربطنا PostgreSQL مع Laravel وNode.js باستخدام Docker Compose، وده بيساعدك تجهز بيئة تطوير قوية ومنظمة.
