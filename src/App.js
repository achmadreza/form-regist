import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {Login} from "./components/Login";
import Registration from "./Component/Registration";


const App = () => {
  return (
  <>
 <Router>
  <Routes>
    <Route path="/" element={<Registration />}/>
  </Routes>
 </Router>
  </>
  )
}
export default App;