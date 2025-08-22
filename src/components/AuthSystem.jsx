import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSystem = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("register");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const currentPath = window.location.pathname;
    
    console.log('Current URL:', window.location.href);
    console.log('Current path:', currentPath);
    console.log('Token from URL:', token);
    
    if (token) {
      // If there's a token in URL, show reset password form
      console.log('Token found, showing reset password form');
      setShowResetPassword(true);
      setShowForgotPassword(false);
      setCurrentPage("");
    } else if (currentPath === "/login") {
      setCurrentPage("login");
      setShowResetPassword(false);
      setShowForgotPassword(false);
    } else if (currentPath === "/reset-password") {
      setShowResetPassword(true);
      setShowForgotPassword(false);
      setCurrentPage("");
    } else {
      setCurrentPage("register");
      setShowResetPassword(false);
      setShowForgotPassword(false);
    }
  }, []);

  // Register Component
  const Register = () => {
    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
      setIsLoading(true);
      
      try {
        const res = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        
        if (res.ok) {
          alert("✅ Registration successful, please login");
          setCurrentPage("login");
        } else {
          alert(data.error || "Registration failed");
        }
      } catch (err) {
        console.error("Registration error:", err);
        alert("Network error. Please check if the server is running.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            CRM Register
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Full Name"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => setCurrentPage("login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    );
  };

  // Login Component
  const Login = () => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginChange = (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
      setIsLoading(true);
      
      try {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          alert("✅ Login successful");
          setUser(data.user);
          setIsAuthenticated(true);
          // Navigate to your existing dashboard route
          navigate('/dashboard');
        } else {
          alert(data.error || "Invalid credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Network error. Please check if the server is running.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            CRM Login
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="login-email" className="text-sm font-medium text-gray-700 block mb-1">
                Email address
              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
               <button 
                type="button" 
                onClick={() => {
                  setShowForgotPassword(true);
                  setCurrentPage("");
                }}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentPage("register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    );
  };
  
  // Forgot Password Component
  const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleForgotPassword = async () => {
      
      if (!email) {
        alert('Please enter your email');
        return;
      }

      setIsLoading(true);
      try {
        console.log('Sending forgot password request for:', email);
        
        const res = await fetch("http://localhost:8000/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        
        const data = await res.json();
        console.log('Forgot password response:', data);
        
        if (res.ok) {
          setEmailSent(true);
          alert("Password reset email sent! Check your inbox and spam folder.");
        } else {
          alert(data.error || "Failed to send reset email");
        }
      } catch (err) {
        console.error("Forgot password error:", err);
        alert("Network error. Please check if the server is running.");
      }
      setIsLoading(false);
    };

    if (emailSent) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Sent!</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and spam folder.
            </p>
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setCurrentPage('login');
                setEmailSent(false);
                setEmail('');
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <div className="space-y-5">
            <div>
              <label htmlFor="forgot-email" className="text-sm font-medium text-gray-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="forgot-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <button 
              onClick={() => {
                setShowForgotPassword(false);
                setCurrentPage('login');
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    );
  };

  // Reset Password Component
  const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
      
      if (!newPassword || !confirmPassword) {
        alert('Please fill all fields');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        alert('Invalid reset link');
        return;
      }

      setIsLoading(true);
      try {
        console.log('Resetting password with token:', token);
        
        const res = await fetch("http://localhost:8000/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword })
        });
        
        const data = await res.json();
        console.log('Reset password response:', data);
        
        if (res.ok) {
          alert("Password reset successful! You can now login with your new password.");
          // Clear the URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
          setShowResetPassword(false);
          setCurrentPage('login');
        } else {
          alert(data.error || "Password reset failed");
        }
      } catch (err) {
        console.error("Reset password error:", err);
        alert("Network error. Please check if the server is running.");
      }
      setIsLoading(false);
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your new password below.
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Remove the Dashboard component since you have your own
  // Dashboard Component is no longer needed

  // Main render logic - Only show auth forms, don't render dashboard
  if (showResetPassword) {
    return <ResetPassword />;
  }
  
  if (showForgotPassword) {
    return <ForgotPassword />;
  }
  
  // Don't render dashboard here since we navigate to /dashboard route
  if (isAuthenticated) {
    return null; // or a loading spinner while navigating
  }
  
  if (currentPage === "login") {
    return <Login />;
  }
  
  return <Register />;
};

export default AuthSystem;