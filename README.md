# 📝 Blog Application 

This project is a blog application that was originally built using Firebase Firestore but has now been fully migrated to MongoDB. The app includes full CRUD functionality, improved UI, and backend enhancements to support a better developer and user experience.

## 🚀 Overview

The backend has been transitioned from Firebase to **MongoDB Atlas** using the native MongoDB Node.js driver. This change improves scalability, flexibility, and control over data handling.

## 🔧 Key Changes

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

```bash
npm install express mongodb cors body-parser

Make sure your MongoDB URI is set in your backend. This project uses:

const uri = 'mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

replace it in server.js

### Start the Server

```bash
node server.js

## 3. Frontend Setup

### 📦 Install Frontend Dependencies
```bash
cd client
npm install

### ▶️ Start the React App

```bash
cd client
npm run dev
