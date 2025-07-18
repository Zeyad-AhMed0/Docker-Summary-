# 🛠️ Docker Installation Guide

This section provides detailed instructions on how to install Docker across different environments, including native Linux, Windows with WSL2, and Docker Desktop.

---

## 📍 1. Installing Docker on Ubuntu (Recommended for Linux-based Development)

### Step 1: Uninstall Old Versions (if any)

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### Step 2: Set up the Docker Repository

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### Step 3: Add Docker’s Official GPG Key

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### Step 4: Add the Docker APT Repository

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Step 5: Install Docker Engine

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin
```

### Step 6: Post-installation Steps

Add current user to the `docker` group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker run hello-world
```

---

## 📍 2. Installing Docker on Windows with WSL2 (Recommended for DevOps workflows)

### Requirements:

* Windows 10 2004+ / Windows 11
* WSL2 installed and a Linux distribution (e.g., Ubuntu)

### Steps:

1. **Install Docker Desktop for Windows**
   👉 [Download from official site](https://www.docker.com/products/docker-desktop)

2. **Enable WSL2 Integration**

   * Go to Docker Desktop → Settings → Resources → WSL Integration
   * Enable integration with your chosen distro (e.g., Ubuntu)

3. **Check Docker version inside WSL2**

```bash
docker --version
docker info
```

If it returns Docker Engine details, you're ready.

---

## 📍 3. Verifying Docker Installation

```bash
docker --version
docker compose version
docker run hello-world
```

Expected Output:

* Docker client/server version
* Compose plugin version
* Hello World message from Docker container

---

## ⚠️ Common Issues

| Issue                                 | Solution                                                              |
| ------------------------------------- | --------------------------------------------------------------------- |
| `docker: permission denied...`        | Run `sudo usermod -aG docker $USER` and reboot or run `newgrp docker` |
| `Cannot connect to the Docker daemon` | Ensure Docker service is running: `sudo systemctl start docker`       |
| `Package not available`               | Check your `sources.list` for correct Docker repo                     |

---

## ✅ Conclusion

Once installed, Docker will be accessible via CLI or GUI (Docker Desktop). For production or scripting, using CLI inside Linux or WSL2 is preferred.
