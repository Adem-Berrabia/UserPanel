# UserPanel – Secure Web-Based User Management

A secure, web-based user panel for efficient user management with authentication, role-based access, and profile handling.

---

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Adem-Berrabia/UserPanel.git
cd UserPanel
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

### Required `.env` variables

```
# MongoDB connection string
MONGODB_URL=your_mongodb_connection_string

# JWT secret key for authentication
JWT_SECRET_KEY=your_secret_key_here

# Cloudinary configuration (for image uploads)
CLOUD_NAME=your_cloud_name_here
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
```

> ⚠️ Keep your `.env` file secret and **do not** commit it to GitHub.

4. Run the application:

```bash
npm start
```

Or for development:

```bash
npm run dev
```

---

## 📁 Project Structure

```
app.js                  # Application bootstrap and middleware setup
routes/                 # Route files
  allRoutes.js
  addUser.js
controllers/            # Controller logic
  authController.js
  userController.js
middleware/             # Custom middleware
  middleware.js
models/                 # Database models
  authUser.js
views/                  # EJS templates
  index.ejs
  welcome.ejs
  auth/                 # Authentication templates
  Components/           # Reusable components
  user/                 # User-related templates
public/                 # Static assets
  css/
  js/
  img/
  bootstrap-icons-1.11.1/
```

---

## 🔧 Common Tasks

- **Add a route:** Create or edit files in `routes/` (see `routes/allRoutes.js`).  
- **Add controller logic:** Update `controllers/authController.js` or `controllers/userController.js`.  
- **Update middleware:** Edit `middleware/middleware.js`.  
- **Modify user model:** Edit `models/authUser.js`.  
- **Update views:** Edit files under `views/`.  

---

## ⚙️ Notes

- Templates use **EJS**.  
- Static files are served from `public/`.  
- Ensure your `.env` contains all required secrets for authentication and database connection.  

---

## 📄 License

MIT License
