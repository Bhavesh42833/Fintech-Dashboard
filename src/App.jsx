import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";
import Access from "./pages/Access";
import Login from "./pages/Login";
import "./index.css";

export default function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Conditional Route Guarding */}
          {!isAuthenticated ? (
            <Route path="*" element={<Login />} />
          ) : (
            <Route element={<Layout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/access" element={<Access />} />
              {/* Redirect any loose routes back to Overview if logged in */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
