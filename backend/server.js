import express from "express";
import mysql from "mysql2/promise";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: [
    "http://localhost:5173",
    "http://localhost:3000", 
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  credentials: true 
}));

// Database connection
let db;
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root", 
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crm_app",
  });
  console.log("✅ Database connected successfully");
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
  process.exit(1);
}

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 CRM Backend Server is running!",
    status: "success",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/api/health",
      register: "POST /api/register",
      login: "POST /api/login",
      profile: "GET /api/profile",
      logout: "POST /api/logout"
    }
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "API is working!",
    status: "healthy",
    database: "connected"
  });
});

// Database test route
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 as test");
    const [tables] = await db.query("SHOW TABLES");
    const [columns] = await db.query("SHOW COLUMNS FROM users");
    const [users] = await db.query("SELECT COUNT(*) as count FROM users");
    
    res.json({
      message: "Database test successful",
      testQuery: rows,
      tables: tables,
      userTableColumns: columns,
      userCount: users[0].count
    });
  } catch (error) {
    res.status(500).json({
      error: "Database test failed",
      details: error.message
    });
  }
});

// Register route
app.post("/api/register", async (req, res) => {
  try {
    console.log("📝 Register request received:", req.body);
    
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }
    
    console.log("🔍 Checking existing user for email:", email);
    // Check if user exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      console.log("❌ User already exists");
      return res.status(400).json({ error: "User already exists with this email" });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcryptjs.hash(password, 10);

    console.log("💾 Inserting user into database...");
    // Using 'name' column instead of 'username' to match your database
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    console.log("✅ User registered successfully, ID:", result.insertId);
    res.status(201).json({ 
      message: "User registered successfully",
      success: true,
      userId: result.insertId
    });
  } catch (err) {
    console.error("❌ Register error details:", {
      message: err.message,
      code: err.code,
      sqlState: err.sqlState,
      stack: err.stack
    });
    res.status(500).json({ 
      error: "Registration failed",
      details: err.message 
    });
  }
});

// Login route  
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ 
      message: "Login successful", 
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Profile route (protected)
app.get("/api/profile", (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ 
      message: "Profile data", 
      user: decoded,
      success: true
    });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
});

// Forgot password route
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];
    
    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [resetToken, resetTokenExpiry, email]
    );

    // Create reset URL
 const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CRM - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password for your CRM account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #888; font-size: 12px;">CRM System - Password Reset</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      message: "Password reset email sent successfully",
      success: true
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Failed to send reset email" });
  }
});

// Reset password route
app.post("/api/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }

    // Find user with valid reset token
    const [users] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );
    const user = users[0];
    
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update password and clear reset token
    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.json({ 
      message: "Password reset successful",
      success: true
    });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Password reset failed" });
  }
});

// Logout route
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ 
    message: "Logged out successfully",
    success: true
  });
});
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    requestedRoute: req.originalUrl
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});


