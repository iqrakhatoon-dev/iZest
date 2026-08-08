import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserLogin          from "../pages/user/UserLogin";
import UserRegister       from "../pages/user/UserRegister";
import FoodPartnerLogin   from "../pages/food-partner/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/food-partner/FoorPartnerRegister";
import Home from "../pages/general/Home"
import CreateFood from "../pages/food-partner/CreateFood";
import FoodPartnerProfile from "../pages/food-partner/FoodPartnerProfile";
import SavedVideos from "../pages/general/savedVideos";

const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-food" element={<CreateFood/>}/>
          <Route path="/user/login"             element={<UserLogin />} />
          <Route path="/user/register"          element={<UserRegister />} />
          <Route path="/food-partner/login"     element={<FoodPartnerLogin />} />
          <Route path="/food-partner/register"  element={<FoodPartnerRegister />} />
          <Route path="/food-partner/profile/:id" element={<FoodPartnerProfile />}/>
          <Route path="/saved" element={<SavedVideos />}/>
        </Routes>
      </Router>
  );
};

export default AppRoutes;