import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[email] && users[email] === password) {
            onLogin(email);
        } else {
            alert("Invalid credentials or user not found!");
        }
    };

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[email]) {
            alert("User already exists!");
        } else {
            users[email] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Please log in.");
        }
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-4">
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white p-6 sm:p-8 shadow-md rounded-md w-full sm:w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleRegister}
                            className="bg-green-500 text-white p-3 rounded w-full hover:bg-green-600"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 mt-4">
                <p>
                    Built with passion and precision by{" "}
                    <span className="text-blue-500 font-bold">Johnson Adedokun</span>.
                </p>
                <p className="mt-2">
                    <em>
                        "Programming is not just about code, it's about crafting
                        experiences."
                    </em>
                </p>
                <p className="mt-2">
                    Let's connect:{" "}
                    <a
                        href="https://www.linkedin.com/in/johnson-adedokun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        LinkedIn
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Login;
