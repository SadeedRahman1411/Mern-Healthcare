import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorHome from "./pages/DoctorHome";
import AmbulanceService from "./pages/AmbulanceService";
import ChamberAppointment from "./pages/ChamberAppointment";
import BloodRequestForm from "./pages/BloodRequestForm";
import BloodRequest from "./pages/BloodRequest";
import RequestList from "./pages/RequestList";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile"; // Import Profile Page
import AmbulanceList from "./pages/AmbulanceList"; // Import AmbulanceList Page
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading && <Spinner />}
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* ✅ Protected Routes - Require authentication */}
          <Route
            path="/doctorhome"
            element={
              <ProtectedRoute>
                <DoctorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ambulanceservice"
            element={
              <ProtectedRoute>
                <AmbulanceService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chamberapp"
            element={
              <ProtectedRoute>
                <ChamberAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reqList"
            element={
              <ProtectedRoute>
                <RequestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bloodreq"
            element={
              <ProtectedRoute>
                <BloodRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bloodreqform"
            element={
              <ProtectedRoute>
                <BloodRequestForm />
              </ProtectedRoute>
            }
          />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />

          {/* ✅ Profile Page (Protected) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ✅ AmbulanceList Page (Protected) */}
          <Route
            path="/ambulance-list"
            element={
              <ProtectedRoute>
                <AmbulanceList />
              </ProtectedRoute>
            }
          />

          {/* ✅ Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;