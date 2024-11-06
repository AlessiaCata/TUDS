import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from './lib/Api';
import UserForm from './components/UserForm';
import Login from './components/Login';
import UserList from './components/UserList';
import EditUsuarios from './components/EditUsuarios';
import Home from './components/Home';
//import Home from './components/Home'; 

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
        <Route path="/EditUsuario/:uuid/edit" element={<EditUsuarios />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






