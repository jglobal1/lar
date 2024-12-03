import React, { useState } from "react";
import Login from "./Components/login";
import TodoList from "./Components/TodoList";


const App = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            {user ? (
                <TodoList user={user} onLogout={() => setUser(null)} />
            ) : (
                <Login onLogin={(email) => setUser(email)} />
            )}
        </div>
    );
};

export default App;
