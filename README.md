# Full-Stack Dynamic Portfolio Website

A dynamic, full-stack portfolio website designed to showcase professional software engineering projects, technical skills, and career experience. 

Unlike typical static portfolio sites that require manual HTML/React code changes for updates, this platform features a secure, integrated **Admin CMS (Content Management System) Backend backed by MongoDB**. This allows the owner to track analytics and manage all displayed content dynamically in real-time.

Check out on web : [LIVE URL](https://portfolio-web-psi-ruby-51.vercel.app/)
---

## ✨ Key Features

- **MongoDB Content Management:** Add, update, or delete projects, skills, and work experiences on the fly via a flexible database schema without rewriting code.
- **Visitor Analytics Dashboard:** Real-time tracking to monitor the total volume of traffic and unique visitors reaching the website, persisted directly in MongoDB.
- **Secure Authentication:** Admin portal protected by encrypted credential verification, ensuring only the owner can modify portfolio data.
- **Responsive Frontend:** Clean, modern, and mobile-friendly UI optimized for recruiters and hiring managers.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS / CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) or Session-based Auth

---

## 📂 Repository Structure

```text
├── Backend/        # Node.js API server, MongoDB models, auth middleware, and routes
└── Frontend/       # React.js application components, state management, and admin views
