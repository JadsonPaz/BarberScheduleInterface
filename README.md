<div align="center">

# 💈 BarberSchedule

### Modern Barber Shop Management Platform

A complete scheduling and management solution built with **React Native (Expo)**, **Node.js**, **Express**, and **MongoDB**.

Designed to provide a fast, intuitive, and professional experience for both customers and barbers.

---

<img src="./assets/banner.png" width="100%" />

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

# 📖 About

BarberSchedule is a complete appointment management system developed to simplify the daily workflow of barber shops.

The project focuses on providing an intuitive experience with minimal visual clutter while offering advanced scheduling features such as:

- Smart appointment scheduling
- Weekly availability management
- Temporary blocked schedules
- Anonymous appointments
- Financial dashboard
- Service management
- Customer history
- Authentication system
- Role-based permissions

The application was designed following clean architecture principles and scalable project organization.

---

# ✨ Features

## 👤 Customer

- Secure authentication
- Register/Login
- User profile
- Schedule appointments
- Appointment confirmation
- Appointment history
- Upcoming appointments
- Profile picture support *(planned)*
- Push notifications *(planned)*

---

## 💈 Barber

- Dashboard
- Financial overview
- Manage services
- Manage prices
- Weekly availability
- Fixed blocked schedules
- Specific date blocking
- Full-day blocking
- Anonymous appointments
- Customer management
- Appointment management

---

## 📅 Smart Scheduling

The scheduling flow was designed to be as simple as possible.

Instead of displaying long forms, the booking process is divided into interactive steps:

```
Choose Barber

↓

Choose Service

↓

Choose Date

↓

Choose Time

↓

Confirmation
```

This approach keeps the interface clean while reducing user mistakes.

---

# 📊 Financial Dashboard

The application includes a simple financial dashboard focused on what really matters.

Features include:

- Monthly revenue
- Daily revenue
- Weekly revenue
- Average ticket
- Most requested services
- Latest payments
- Monthly comparison *(planned)*

---

# 🔐 Authentication

Authentication uses:

- JWT
- bcrypt
- Express Validator
- Protected routes
- Role permissions

Passwords are encrypted before being stored.

---

# 🏗 Project Structure

```
src
│
├── assets
├── components
│   ├── auth
│   ├── cards
│   ├── financialDashboard
│   ├── headers
│   └── scheduling
│
├── hooks
├── screens
│   ├── auth
│   ├── home
│   ├── profile
│   ├── appointment
│   └── admin
│
├── services
├── types
├── utils
└── global
```

The project follows a modular structure, making future maintenance easier.

---

# ⚙ Backend Architecture

The backend follows a layered architecture:

```
Routes

↓

Controllers

↓

Data Access

↓

MongoDB
```

This separation improves readability, maintainability and scalability.

---

# 🗄 Database

Main collections:

- Users
- Appointments
- Services
- Availability
- Blocked Slots

---

## Appointment Flow

```
Customer

↓

Choose Barber

↓

Choose Service

↓

Choose Date

↓

Choose Time

↓

Availability Validation

↓

Appointment Created
```

---

## Availability Validation

Before creating an appointment the system checks:

✔ Barber working hours

✔ Weekly blocked schedules

✔ Specific blocked dates

✔ Existing appointments

Only available time slots can be booked.

---

# 🚀 Technologies

### Mobile

- React Native
- Expo

### Backend

- Node.js
- Express

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Validation

- Express Validator

### Storage

- AsyncStorage

### HTTP

- Axios

---

# 📱 Screens

Current screens include:

- Login
- Register
- Home
- Profile
- Appointment
- Financial Dashboard
- Services
- Availability
- Blocked Slots
- Admin Dashboard

---

# 🚧 Future Improvements

- Push Notifications
- Image Upload
- PWA Version
- Play Store Release
- iOS Release
- Online Payments
- Coupons
- Customer Reviews
- Loyalty Program
- Analytics Dashboard
- Multiple Barber Shops

---

# 🎯 Goals

This project was created to:

- Improve the appointment experience
- Reduce scheduling conflicts
- Simplify barber shop management
- Learn scalable software architecture
- Build a production-ready portfolio project

---

# 📸 Preview

> Screenshots coming soon.

```
Home
Profile
Scheduling
Financial Dashboard
Admin Panel
```

---

# 🚀 Running the Project

## Clone

```bash
git clone https://github.com/your-user/BarberSchedule.git
```

---

## Install

```bash
npm install
```

---

## Start

```bash
npx expo start
```

---

## Backend

```bash
npm install

npm run dev
```

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the project and submit a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

### Jadson Paz Sales

Full Stack Developer

Passionate about building modern applications with clean architecture and intuitive user experiences.

GitHub:

https://github.com/JadsonPaz

---

<div align="center">

### ⭐ If you enjoyed this project, consider giving it a star!

</div>
