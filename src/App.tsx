import React, { useState } from 'react';
import Login from './components/sign-in-form';
import SignUpForm from './components/sign-up-form';

interface User {
  username: string;
  password: string;
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Logowanie
  const handleLogin = (username: string, password: string) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
      console.log(`Zalogowano jako: ${username}`);
    } else {
      console.log('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
  };

  // Rejestracja
  const handleRegister = (username: string, password: string) => {
    if (!users.find(user => user.username === username)) {
      setUsers(prevUsers => [...prevUsers, { username, password }]);
      console.log(`Utworzono nowego użytkownika: ${username}`);
    } else {
      console.log('Nazwa użytkownika jest już zajęta.');
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
