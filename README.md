# Cloud Conductors

## Scrum Master

- Jakob Olsen

## Product Owner

- NSA

## Developers

- Nick Petruccelli
- Christopher Cuartas
- Troy Brown
- Devin Thompson
- Bryonna Gray
- Jakob Olsen

# 🚀 Application Setup Guide

This project can be run using **Docker** (recommended for deployment) or **locally** (recommended for debugging).

---

## ⚙️ Docker Setup

> **Pros:** Easy startup  
> **Cons:** Poor for debugging, must restart Docker to see changes

### 🧩 Prerequisites
1. Ensure you have received the `.env` file and placed it inside the `Main/` directory.
2. [Install Docker Desktop](https://www.docker.com/) if not already installed.
3. Start Docker Desktop.
4. Open a terminal in VS Code using **Git Bash**.

### ▶️ Start Containers
```bash
docker-compose up --build
```

### 🐞 Stop Containers for Debugging
```bash
docker-compose down
```
Or manually delete the containers using Docker Desktop.

---

## 🖥️ Running Locally (Recommended for Debugging)

> Run **Flask** and **React** separately.  
> Hot-reloading is supported for easier development.

---

### 🔧 1. Flask Setup

#### 📌 Step-by-step
1. Open a terminal in VS Code (**Use Git Bash**).
2. Check Python version:
   ```bash
   python --version
   ```
   - If not installed: [Install Python 3](https://pythongeeks.org/python-3-installation-and-setup-guide/)

3. Navigate to Flask backend:
   ```bash
   cd flask-backend
   ```

4. Create virtual environment:
   ```bash
   python -m venv venv
   ```

5. Activate virtual environment:
   ```bash
   source venv/Scripts/activate
   ```
   - You should see `(venv)` in the terminal prompt.

6. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

#### ☁️ AWS Configuration
```bash
aws configure
```
- If `aws` doesn't work on Windows:
  ```bash
  aws.cmd configure
  ```
- Or use:
  ```bash
  python -m awscli configure
  ```

##### Use the following values:
- **Access Key ID:** `AWS_ACCESS_KEY`
- **Secret Access Key:** `AWS_SECRET_KEY`
- **Region:** `us-east-1`
- **Output format:** *(press Enter)*

#### ▶️ Run Flask App in Debug Mode
```bash
flask --debug run
```

> The app should be accessible at: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

### ⚛️ 2. React Setup

#### 📌 Step-by-step
1. Open a second terminal in VS Code (**Use Git Bash**).
2. Check if `npm` is installed:
   ```bash
   npm --version
   ```
   - If not installed: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

3. Navigate to React frontend:
   ```bash
   cd react-frontend
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start React App:
   ```bash
   npm start
   ```

> The React app usually runs at: [http://localhost:3000/](http://localhost:3000/)
