import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Login from './components/Login';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

import ProtectedRoute from './components/ProtectedRoute'; // Importar ProtectedRoute

function App() {
  return (
    <div className="App">
      <TopHeader />
      
      <div id="body">
        <Routes>
          <Route path="/" element={<div>Bienvenido</div>} />
          <Route path="*" element={<div>No encontrado</div>} />
          <Route 
            path="/UserList" 
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            } 
          />
          <Route path="/Login" element={<Login />} /> 
          <Route path="/UserForm" element={<UserForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

