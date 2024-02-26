import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact";
import UserPrivateRoute from "./components/Layouts/Routes/UserPrivateRoute";
import DashBoardDetails from "./pages/user/DashBoardDetails";
import DashBoardProfileUpdate from "./pages/user/DashBoardProfileUpdate";
import DashBoardOrders from "./pages/user/DashBoardOrders";
import DashBoardLayout from "./pages/user/DashBoardLayout";
import CartPage from "./pages/CartPage";
import AdminPrivateRoute from "./components/Layouts/Routes/AdminPrivateRoute";
import AdminDashBoardLayout from "./pages/Admin/AdminDashBoardLayout";
import DashBoardAdminProfileUpd from "./pages/Admin/DashBoardAdminProfileUpd";
import DashBoardAdminAllOrder from "./pages/Admin/DashBoardAdminAllOrder";
import DashBoardAdminCreateCategory from "./pages/Admin/DashBoardAdminCreateCategory";
import DashBoardAdminCreatePets from "./pages/Admin/DashBoardAdminCreatePets";
import DashBoardAdminAllPets from "./pages/Admin/DashBoardAdminAllPets";
import DashBoardAdminDetails from "./pages/Admin/DashBoardAdminDetails";


function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<DashBoardLayout />} />
          <Route path="user/user-details" element={<DashBoardDetails />} />
          <Route path="user/update-profile" element={<DashBoardProfileUpdate />}/>
          <Route path="user/orders" element={<DashBoardOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashBoardLayout />} />
          <Route path="admin/admin-details" element={<DashBoardAdminDetails />} />
          <Route path="admin/update-profile" element={<DashBoardAdminProfileUpd />} />
          <Route path="admin/orders" element={<DashBoardAdminAllOrder />} />
          <Route path="admin/create-category" element={<DashBoardAdminCreateCategory />} />
          <Route path="admin/create-product" element={<DashBoardAdminCreatePets />} />
          <Route path="admin/products" element={<DashBoardAdminAllPets />} />

        </Route>

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
