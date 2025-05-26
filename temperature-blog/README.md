#  Temperature Blog Application (Node.js + MongoDB + Kubernetes)

This project is a full-stack CRUD application for managing temperature logs by city. It is containerized with Docker and deployed on Kubernetes using MongoDB as the backend database.

---

##  Features

- Create, Read, Update, Delete (CRUD) temperature entries
- Persistent MongoDB database with PVC
- Kubernetes Secrets for secure credentials
- Service exposure using LoadBalancer or Port-Forward
- Dockerized for easy deployment

---

##  Folder Structure

```
temperature-blog/
├── Dockerfile
├── app.js
├── package.json
├── public/
│   └── style.css
├── views/
│   ├── index.html
│   ├── new.html
│   └── edit.html
├── mongo-pv.yaml
├── mongo-secret.yaml
├── mongo-deployment.yaml
├── mongo-service.yaml
├── app-deployment.yaml
└── app-service.yaml
```

---

##  Setup Instructions

### 1. Clone Repo & Build Docker Image

```bash
docker build -t <your-dockerhub-username>/temperature-blog .
docker push <your-dockerhub-username>/temperature-blog
```

Update `app-deployment.yaml`:
```yaml
image: <your-dockerhub-username>/temperature-blog
```

---

### 2. Deploy to Kubernetes

```bash
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
```

---

### 3. Access the Application

#### Option A: NodePort

```bash
kubectl get svc temperature-service
```
Open `http://localhost:<NODE_PORT>`

#### Option B: Port Forward

```bash
kubectl port-forward svc/temperature-service 8888:80
```
Open [http://localhost:8888](http://localhost:8888)

---



