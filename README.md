# 🌾 Smart Farmer's Market Buffer Scheduler

A comprehensive platform that connects farmers and buyers, enabling advance produce bookings with real-time inventory management and seamless communication.

---

## 🌟 Features

### 👨‍🌾 For Farmers
- **Produce Management** – Register daily available produce with quantity limits  
- **Order Processing** – View, confirm, and manage received orders  
- **Real-time Updates** – Get instant notifications for new orders  
- **Dashboard** – Track sales statistics and performance metrics  

### 🛒 For Buyers
- **Browse Produce** – View fresh, available produce from local farmers  
- **Advance Booking** – Place orders with specific pickup dates and quantities  
- **Real-time Availability** – See live stock updates as orders are placed  
- **Order Tracking** – Monitor order status from confirmation to pickup  

### 🛠 For Administrators
- **User Management** – Monitor and manage all platform users  
- **Order Oversight** – View all transactions and handle disputes  
- **System Analytics** – Access comprehensive platform statistics  
- **Content Moderation** – Manage listings and user activities  

---

## 🛠 Technology Stack

### Frontend
- React 18 with TypeScript  
- Tailwind CSS  
- React Router  
- Socket.IO Client  
- React Hook Form  
- React Hot Toast  

### Backend
- Node.js  
- Express.js  
- MongoDB with Mongoose ODM  
- JWT Authentication  
- Socket.IO  
- NodeMailer  
- Bcrypt  

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-farmers-market-scheduler.git
cd smart-farmers-market-scheduler
```

---

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
npm install
cd frontend && npm install
cd ../backend && npm install
```

---

### 3. Environment Configuration

Create backend `.env` file:

```bash
cp backend/.env.example backend/.env
```

Update `.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/farmers-market

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password

# Server Settings
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

### 4. Start Development Servers

```bash
# Run frontend and backend together
npm run dev

# Run separately
npm run dev:frontend
npm run dev:backend
```

---

### 5. Access the Application

Frontend  
```
http://localhost:5173
```

Backend API  
```
http://localhost:5000/api
```

---

## 📡 API Documentation

### Authentication

```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

### Produce

```
POST   /api/produce
GET    /api/produce
GET    /api/produce/farmer
GET    /api/produce/:id
PUT    /api/produce/:id
DELETE /api/produce/:id
GET    /api/produce/search
```

### Orders

```
POST   /api/orders
GET    /api/orders/buyer
GET    /api/orders/farmer
GET    /api/orders/admin
GET    /api/orders/:id
PUT    /api/orders/:id/status
DELETE /api/orders/:id
```

### Admin – User Management

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/stats/summary
```

---

## 🏗 Project Structure

```
smart-farmers-market-scheduler
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── contexts
│   │   ├── pages
│   │   │   ├── auth
│   │   │   ├── farmer
│   │   │   ├── buyer
│   │   │   └── admin
│   │   ├── services
│   │   └── utils
│   └── public
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## 🔒 Security Features

- JWT Authentication  
- Password hashing using Bcrypt  
- Rate limiting for APIs  
- Input validation using Express Validator  
- CORS protection  
- Helmet security headers  

---

## 📧 Email Notifications

The system sends automated emails for:

- Welcome messages for new users  
- Order confirmation notifications  
- Order status updates  
- System alerts  

---

## 🌐 Real-time Features

Using **Socket.IO** for:

- Live inventory updates  
- Real-time order notifications  
- Status updates for buyers  
- Dashboard updates  

---

## 👥 User Roles & Permissions

### Farmer
- Manage produce listings
- View received orders
- Update order status
- Access farmer statistics

### Buyer
- Browse available produce
- Place and track orders
- Cancel pending orders
- View purchase history

### Admin
- Full system access
- Manage users
- Monitor orders
- Access analytics

---

## 🧪 Testing

Frontend

```bash
cd frontend
npm test
```

Backend

```bash
cd backend
npm test
```

---

## 🚀 Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
```

### Backend (Heroku / Render / DigitalOcean)

```bash
cd backend
npm start
```

Production setup:
- Use MongoDB Atlas
- Configure SMTP email
- Set strong JWT secrets
- Configure CORS
- Enable HTTPS

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit changes

```bash
git commit -m "Add amazing feature"
```

4. Push branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 🐛 Known Issues

1. MongoDB connection errors – ensure MongoDB is running  
2. Email configuration issues – check SMTP credentials  
3. Socket.IO connection problems – verify CORS settings  
4. Port conflicts – ensure ports **5000** and **5173** are available  

---

## 💡 Development Tips

- Use **MongoDB Compass** for database management  
- Install **React Developer Tools**  
- Use **Postman** for API testing  
- Check browser console for frontend errors  
- Monitor backend logs  

---

## 📞 Support

For help:

- Create a GitHub Issue  
- Review documentation  
- Check API endpoints  

---

## 🎯 Future Enhancements

- Payment integration (Stripe / PayPal)  
- React Native mobile app  
- Advanced analytics  
- Multi-language support  
- Image upload for products  
- Rating system  
- Delivery service integration  

---

## 📄 License

This project is licensed under the **MIT License**.

---

❤️ Built for connecting farmers and buyers in local communities.
