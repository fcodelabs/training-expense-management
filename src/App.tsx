import LogIn from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ExpenseHome from './pages/ExpenseHome/ExpenseHome';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/expenseHome" element={<ExpenseHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
