# 📝 Blog Application 

This project is a blog application that was originally built using Firebase Firestore but has now been fully migrated to MongoDB. The app includes full CRUD functionality, improved UI, and backend enhancements to support a better developer and user experience.

##  Overview
This features a backend developed with **Express.js**, where I implemented **RESTful API** endpoints to manage article data stored in **MongoDB**. The backend supports full **CRUD functionality**, including `GET` requests to retrieve all articles, `POST` requests to create new entries, `PUT` requests to update existing articles, and `DELETE` requests to remove articles by their unique ID. On the frontend, built using **React**, I integrated these APIs with functions like `fetchArticles()`, `createArticle()`, `updateArticle()`, and `deleteArticle()`. These handle data fetching and user interactions, allowing dynamic article creation, editing, and deletion directly from the interface. The setup ensures smooth client-server communication and real-time UI updates based on user actions.

##  Key Changes

### 1. Backend Overhaul

#### ✅ Database Connection
- Firebase removed, replaced with MongoDB Atlas
- Secure connection established using credentials
- Connection management handled with startup and cleanup logic

#### ✅ CRUD Endpoints
RESTful API for blog articles:
- `GET /articles` – Get all articles (sorted by date)
- `POST /articles/create-article` – Create a new article
- `PUT /articles/:id` – Update an existing article
- `DELETE /articles/:id` – Delete an article

## 🚀 Installation Guide

### Prerequisites
- Node.js (v16 or later)
- MongoDB Atlas account
- Git (optional)

## 2. 🔧 Backend Setup

### Install Dependencies

npm install express mongodb cors body-parser

Make sure your MongoDB URI is set in your backend. This project uses:

const uri = 'mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

replace it in server.js

### Start the Server

node server.js

## 3. Frontend Setup

### 📦 Install Frontend Dependencies

cd client
npm install

### ▶️ Start the React App

```bash
cd client
npm run dev
