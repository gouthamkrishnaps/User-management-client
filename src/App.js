import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  
  return (
    <div >
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path='/user-login' element={<Login/>}/>
        <Route path='/user-register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
