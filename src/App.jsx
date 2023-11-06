import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Suggestions from "./pages/Suggestions";
import UserProfile from "./pages/UserProfile";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import Saved from "./pages/Saved";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/suggestions' element={<Suggestions />} />
          <Route path='/Home' element={<Home />} />
          <Route exact path='/messages' element={<Message />} />
          <Route path='/messages/:id' element={<Message />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/groups' element={<Groups />} />
          <Route path='/groups/:id' element={<Groups />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/:str' element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
