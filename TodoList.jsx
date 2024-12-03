import React, { useState, useEffect } from "react";

const TodoList = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    // Load tasks and profile picture on mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem(user)) || [];
        const savedProfilePic = localStorage.getItem(`${user}-profilePic`);
        setTasks(savedTasks);
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        }
    }, [user]);

    // Add a new task with date and time
    const addTask = () => {
        if (task.trim() && dateTime) {
            const newTasks = [
                ...tasks,
                { task, completed: false, dateTime },
            ];
            setTasks(newTasks);
            localStorage.setItem(user, JSON.stringify(newTasks));
            setTask("");
            setDateTime("");
        } else {
            alert("Please enter a task and select a date and time.");
        }
    };

    // Toggle task completion
    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
        localStorage.setItem(user, JSON.stringify(newTasks));
    };

    // Delete a task
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        localStorage.setItem(user, JSON.stringify(newTasks));
    };

    // Handle profile picture upload
    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
                localStorage.setItem(`${user}-profilePic`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-4">
                {/* User Profile and Greeting */}
                <div className="flex items-center mb-4">
                    {profilePic ? (
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold">Hello, {user}!</h1>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileUpload}
                            className="text-sm mt-1"
                        />
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white p-2 rounded mb-4"
                >
                    Logout
                </button>

                {/* Task Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Add a task"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                        Add Task
                    </button>
                </div>

                {/* Task List */}
                <ul>
                    {tasks.map((t, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center p-2 border-b ${
                                t.completed ? "line-through text-gray-500" : ""
                            }`}
                        >
                            <div>
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggleComplete(index)}
                                    className="mr-2"
                                />
                                <span>{t.task}</span>
                                <div className="text-sm text-gray-500">
                                    {new Date(t.dateTime).toLocaleString()}
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTask(index)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
