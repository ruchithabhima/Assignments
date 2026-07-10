import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import IncomeManagement from "./pages/IncomeManagement";
import ExpenseManagement from "./pages/ExpenseManagement";
import "./styles/DashboardStyles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/settings" element={<Settings />} />
         <Route path="/income" element={<IncomeManagement />} />
         <Route path="/expense" element={<ExpenseManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
