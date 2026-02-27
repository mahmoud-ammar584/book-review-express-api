const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
    let token = null;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
        console.log("[AUTH] Token found in Authorization header");
    } else if (req.session.authorization) {
        token = req.session.authorization['accessToken'];
        console.log("[AUTH] Token found in session");
    }

    if (token) {
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                console.log(`[AUTH] Token verified. User payload:`, JSON.stringify(user));
                req.user = user;
                next();
            } else {
                console.error("[AUTH] JWT Verification Failed:", err.message);
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        console.warn("[AUTH] No token provided for protected route:", req.originalUrl);
        return res.status(403).json({ message: "User not logged in" });
    }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
