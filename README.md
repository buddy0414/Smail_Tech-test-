<<<<<<< HEAD
# Smail_Tech-test-
=======
# Trendies - Luxury Resale Platform

A modern, full-stack e-commerce platform for luxury resale in Morocco, built with React, NestJS, and PostgreSQL.

## 🌟 Features

- **Authentication System**
  - Email/Password Registration & Login
  - Google OAuth Integration
  - Facebook OAuth Integration
  - JWT-based Authentication
  - Persistent Login Sessions

- **User Experience**
  - Modern, Responsive UI with Tailwind CSS
  - Real-time Form Validation
  - Interactive Success/Error Notifications
  - Smooth Authentication Flow
  - Secure Password Handling

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API Communication
- React OAuth2 | Google
- Context API for State Management

### Backend
- NestJS
- PostgreSQL Database
- Prisma ORM
- JWT Authentication
- Google & Facebook OAuth Integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd trendies
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/trendies"
   JWT_SECRET="your-jwt-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   FACEBOOK_APP_ID="your-facebook-app-id"
   FRONTEND_URL="http://localhost:3000"
   ```

   Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

3. **Frontend Setup**
   ```bash
   cd front
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL="http://localhost:5000"
   REACT_APP_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

4. **Start the Development Servers**

   Backend:
   ```bash
   cd backend
   npm run start:dev
   ```

   Frontend:
   ```bash
   cd front
   npm start
   ```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe"
  }
  ```

- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/facebook` - Facebook OAuth login
- `GET /api/auth/verify` - Verify JWT token

## 🔒 Security Features

- Password Hashing with bcrypt
- JWT Token Authentication
- Protected API Routes
- Secure OAuth Implementation
- Input Validation & Sanitization

## 🎨 UI/UX Features

- Responsive Design
- Form Validation
- Loading States
- Success/Error Notifications
- Smooth Transitions
- Modern Authentication UI

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- NestJS Team
- React Team
- Prisma Team
- All contributors and supporters

## 📞 Support

For support, email support@trendies.com or join our Slack channel.

---

Made with ❤️ for the luxury resale community in Morocco 
>>>>>>> origin/mdev
