import './App.css';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Login from './components/Login';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Menu from './components/Menu';
import { useState } from 'react';

function App() {
  const [menuVisibility /*, setMenuVisibility */] = useState(true); 
  
  return (
    <div className="App">
      <TopHeader />
      <Menu menuVisibility={menuVisibility} /> 
      <div id="body">
        <Routes>
          <Route path="/" element={<div>Bienvenido</div>} />
          <Route path="*" element={<div>No encontrado</div>} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/Login" element={<Login />} /> 
          <Route path="/UserForm" element={<UserForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


