import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateComponent from './components/PrivateComponent';
import Pagenotfound from './pages/Pagenotfound';

function App() {
  return (
<>

<BrowserRouter>
<Routes>
  
     <Route element={<PrivateComponent />} >
           <Route path='/about' element={<About />} />
           <Route path='/dashboard' element={<Dashboard />} />
    </Route>

  <Route path='/signup' element={<Register />} />
  <Route path='/' element={<Home />} />
  <Route path='/signin' element={<Login />} />
  <Route path='*' element={<Pagenotfound />} />

</Routes>
</BrowserRouter>
</>
  );
}

export default App;
