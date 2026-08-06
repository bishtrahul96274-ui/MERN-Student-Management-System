import './Index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import About from '../About';
import Contact from './Contact';
import Course from './Course';


function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Nav />
        <main className="page-container">
          <Routes>
            <Route path='/' element={<Navigate to='/home' replace />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/course' element={<Course />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
