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
          {/* ✅ Public Homepage - Always accessible */}
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
          <Route
            path="/contactus"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />

          {/* ✅ Public Routes - Only accessible when logged OUT */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
