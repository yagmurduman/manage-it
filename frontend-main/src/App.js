import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/Login";
import LandingPage from "./views/Landing";
import SignupPage from "./views/Signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import ForgotPage from "./views/Forgot";
import VerificationPage from "./views/Verification";
import ResetPage from "./views/Reset";
import CheckoutPage from "./views/Checkout";
import BacklogPage from "./views/Backlog";
import NewProjectPage from "./views/CreateNewProject";
import EditProjectPage from "./views/EditProject";
import TestPage from "./views/Test";
import ConsultationPage from "./views/Consultants";
import ConsultancyBookingViewPage from "./views/ConsultancyBookingView";
import ConsultantProfilePage from "./views/ConsultantProfile";
import ActionItemPage from "./views/ActionItem";
import PaymentSuccessPage from "./views/PaymentSuccess";
import ConsultationSuccessPage from "./views/ConsultationSuccess";
import PaymentFailPage from "./views/PaymentFail";
import SubscriptionSuccessPage from "./views/SubscriptionSuccess";
import SubscriptionFailPage from "./views/SubscriptionFail";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import HelpSupportPage from "./views/HelpSupport";
import NotFoundPage from "./views/NotFound";
import AddEmployeePage from "./views/AddEmployee";
import RegisterEmployeePage from "./views/RegisterEmployee";
import AboutUsPage from "./views/AboutUs";
import SettingsPage from "./views/Settings";

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/backlog" exact element={<BacklogPage />} />
          <Route path="/signup/:token" exact element={<SignupPage />} />
          <Route path="/forgotpassword" exact element={<ForgotPage />} />
          <Route path="/resetpassword/:token" exact element={<ResetPage />} />
          <Route path="/verification" exact element={<VerificationPage />} />
          <Route path="/addEmployee" exact element={<AddEmployeePage />} />
          <Route path="/createproject" exact element={<NewProjectPage />} />
          <Route path="/editproject" exact element={<EditProjectPage />} />
          <Route path="/pay/:project_id" exact element={<CheckoutPage />} />
          <Route
            path="/checkout-success/:session_id"
            exact
            element={<PaymentSuccessPage />}
          />
          <Route
            path="/consultation-booking-success/:session_id"
            exact
            element={<ConsultationSuccessPage />}
          />
          <Route
            path="/subscription-success/:session_id"
            exact
            element={<SubscriptionSuccessPage />}
          />
          <Route path="/checkout-fail" exact element={<PaymentFailPage />} />
          <Route
            path="/registeremployee/:token"
            exact
            element={<RegisterEmployeePage />}
          />
          <Route path="/actionitem" exact element={<ActionItemPage />} />
          <Route
            path="/subscription-fail"
            exact
            element={<SubscriptionFailPage />}
          />
          <Route
            path="/subscription-fail"
            exact
            element={<SubscriptionFailPage />}
          />
          <Route path="/consultant" exact element={<ConsultantProfilePage />} />
          <Route path="/consultants" exact element={<ConsultationPage />} />
          <Route
            path="/consultancybookingview"
            exact
            element={<ConsultancyBookingViewPage />}
          />
          <Route path="/aboutus" exact element={<AboutUsPage />} />
          <Route path="/helpsupport" exact element={<HelpSupportPage />} />
          <Route path="/settings" exact element={<SettingsPage />} />
          <Route path="/test" exact element={<TestPage />} />
          <Route path="/*" exact element={<NotFoundPage />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
