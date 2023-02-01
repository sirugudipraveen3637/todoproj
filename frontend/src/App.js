
import './App.css';
import Login from './components/login';
import Signup from  './components/signup';
import Todo from './components/todo';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import Header  from './components/header';

import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
       {/* <Header></Header> 
       
      <Todo></Todo> */}

      <Router>
        <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Todo />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/resetpassword/:id' element={<ResetPassword />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
