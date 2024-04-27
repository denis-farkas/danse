import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import UserProfile from "./pages/userProfile";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import FormWorkshop from "./pages/formWorkshop";
import Workshop from "./pages/workshop";
import WorkshopFilter from "./pages/workshopFilter";
import RegisteredWorkshop from "./pages/registeredWorkshop";
import BackOffice from "./pages/backOffice";
import BackUser from "./pages/backUser";
import EditWorkshop from "./pages/editWorkshop";
import BackCategory from "./pages/backCategory";
import BackWorkshop from "./pages/backWorkshop";
import BackMessage from "./pages/backMessage";
import { WorkshopsProvider } from "./context/WorkshopsProvider";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="container">
        <WorkshopsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/formWorkshop" element={<FormWorkshop />} />
            <Route
              path="/workshop/:dancer_workshop_id"
              element={<Workshop />}
            />
            <Route path="/workshopFilter" element={<WorkshopFilter />} />
            <Route
              path="/registeredWorkshop"
              element={<RegisteredWorkshop />}
            />
            <Route path="/backOffice" element={<BackOffice />} />
            <Route path="/backUser" element={<BackUser />} />

            <Route
              path={`/editWorkshop/:dancer_workshop_id`}
              element={<EditWorkshop />}
            />
            <Route path="/backCategory" element={<BackCategory />} />
            <Route path="/backWorkshop" element={<BackWorkshop />} />
            <Route path="/backMessage" element={<BackMessage />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </WorkshopsProvider>
      </div>
    </Router>
  );
}

export default App;
