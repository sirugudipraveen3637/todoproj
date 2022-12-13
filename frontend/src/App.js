
import './App.css';
import Login from './components/login';
import Signup from  './components/signup';
import Todo from './components/todo';
import Header  from './components/header';

function App() {
  return (
    <div className="App">
       <Header></Header> 
     
      <Todo></Todo>
    </div>
  );
}

export default App;
