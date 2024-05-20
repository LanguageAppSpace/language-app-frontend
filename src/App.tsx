import React, { useState } from "react";
import Login from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

interface User {
  username: string;
  password: string;
}

const App = () => {
  // NOTE: This local state will be replaced with another PR
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleLogin = (username: string, password: string) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
    }
  };

  const handleRegister = (username: string, password: string) => {
    if (!users.find(user => user.username === username)) {
      setUsers(prevUsers => [...prevUsers, { username, password }]);
    } 
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Jesteś zalogowany</h2>
          <button onClick={handleLogout}>Wyloguj się</button>
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <SignUpForm onRegister={handleRegister} />
        </div>
      )}
    </div>
  );
};

export default App;
