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
import Reports from "./pages/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Users from "./pages/Users";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
        <Route element={<Layout/>}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
         <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
         <Route path="/income" element={<ProtectedRoute><IncomeManagement /></ProtectedRoute>} />
         <Route path="/expense" element={<ProtectedRoute><ExpenseManagement /></ProtectedRoute>} />
         <Route path="/report" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
         <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
