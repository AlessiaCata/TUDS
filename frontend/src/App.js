import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from './lib/Api';
import UserForm from './components/UserForm';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Api.setMessageForAutoCheck = setMessage;

    const auth = localStorage.getItem('Authorization');
    if (auth) {
      Api.defaultHeaders.Authorization = auth;
      const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
      setRoles(roles);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setRoles={setRoles} />} />
        <Route path="/login" element={<Login setRoles={setRoles} />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


