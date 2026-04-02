# 🚀 Aero Ledger

### Institutional Fintech Dashboard

A modern, responsive fintech dashboard built with **React + Vite + Tailwind CSS + Redux Toolkit**, featuring secure authentication, role-based access control, and a powerful transaction analytics engine.

---

## ✨ Overview

**Aero Ledger** is designed to simulate an institutional-grade financial dashboard with a strong focus on:

* 🔐 Secure access control (RBAC)
* 📊 Real-time transaction insights
* 🎯 Clean, scalable UI/UX
* ⚡ High-performance frontend architecture

---

## 🌟 Features

### 🔐 Authentication Experience

* Elegant **Hero-based login UI** (2:3 grid layout)
* Dynamic **typewriter animation** for brand messaging
* Profile-based login system (Admin / Viewer)
* Global auth state managed via **Redux**

---

### 🛡️ Role-Based Access Control (RBAC)

* Route-level protection using `react-router-dom`
* Admin-only privileges:

  * Add Member
  * Edit Data
  * Delete Records
* Viewer mode ensures **read-only safety**

---

### 📊 Transaction Engine

* Advanced filtering system:

  * 🔎 Search queries
  * 💰 Income/Expense thresholds
  * 📌 Status-based filters
* 📤 **Export to CSV** (client-side Blob generation)
* Clean tabular UI optimized for large datasets

---

### 🎨 UI & Design System

* 🌙 Fully dynamic **Dark Mode**
* ✨ Glassmorphism + backdrop blur effects
* 📱 Mobile-first responsive layout
* 🎯 No horizontal overflow issues across devices

---

## 📸 Screenshots

### 🖥️ Dashboard Overview

![Overview](./public/screenshots/overview.png)

### 📊 Transactions Panel

![Transactions](./public/screenshots/transactions.png)

### 🔐 Access Control

![Access](./public/screenshots/access.png)

---

## 🧱 Tech Stack

| Category | Technology              |
| -------- | ----------------------- |
| Frontend | React 18, Vite          |
| Styling  | Tailwind CSS v3         |
| State    | Redux Toolkit           |
| Routing  | react-router-dom        |
| Icons    | Google Material Symbols |

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js (v16+ recommended)

---

### 📦 Installation

```bash
git clone https://github.com/Bhavesh42833/Fintech-Dashboard.git
cd Fintech-Dashboard
npm install
```

---

### ▶️ Run the App

```bash
npm run dev
```

Visit: **[http://localhost:5173](http://localhost:5173)**

---

### 🔑 How to Use

1. Select a profile (Admin / Viewer)
2. Click the arrow to authenticate
3. Explore dashboard features based on role

---

## 📁 Project Structure

```bash
src/
│
├── components/      # Reusable UI (Sidebar, Modals, Header)
├── constants/       # Theme + config tokens
├── context/         # Theme context (Dark/Light)
├── pages/           # Core views (Login, Dashboard, etc.)
├── store/           # Redux slices
│   ├── userSlice.js
│   └── transactionsSlice.js
│
├── App.jsx          # Route protection logic
├── main.jsx         # App entry point
└── index.css        # Global styles + glassmorphism
```

---

## 🚀 Highlights

* ⚡ Lightning-fast dev experience with **Vite HMR**
* 🧠 Clean state architecture with Redux slices
* 📊 Real-world fintech UX simulation
* 🎯 Production-style UI polish

---
<p align="center">
  Built with precision, performance, and 💙
</p>

---
