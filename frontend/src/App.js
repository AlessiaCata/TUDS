import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from './lib/Api';
import UserForm from './components/UserForm';
import Login from './components/Login';
import UserList from './components/UserList';
import Home from './components/Home';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import ListaPet from './components/ListaPet';


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
        <Route path="/" element={<Home setRoles={setRoles} />} />
        <Route path="/login" element={<Login setRoles={setRoles} />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/userform/:uuid" element={<UserForm />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/home" element={<Home />} />
        
        {/* Rutas para mascotas con uuid */}
        <Route path="/petlist" element={<ListaPet />} />
        <Route path="/petform" element={<PetForm />} />
        <Route path="/petform/:uuid" element={<PetForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






