import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import WhoweServe from "./pages/WhoweServe";
import WhyUs from "./pages/WhyUs";
import Key from "./pages/Key";
import Companies from "./pages/Companies";
import Trucks from "./pages/Trucks";
import Nature from "./pages/Nature";
import Enquiries from "./pages/Enquiries";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import EditCategory from "./pages/EditCategory";
import EditKey from "./pages/EditKey";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import EditCompany from "./pages/EditCompany";
import EditTrucks from "./pages/EditTrucks";
import NewServe from "./pages/AddNew/NewServe";
import NewKey from "./pages/AddNew/NewKey";
import EditWhyUs from "./components/EditWhyUs";
import EditProduct from "./pages/EditProduct";
import Profile from "./pages/Profile";
import NewWhy from "./pages/AddNew/NewWhy";
import NewCompany from "./pages/AddNew/NewCompany";
import NewTruck from "./pages/AddNew/NewTruck";
import NewsLetter from "./pages/NewsLetter";
import NewCategory from "./pages/AddNew/NewCategory";
import NewProduct from "./pages/AddNew/NewProduct";
import Properties from "./pages/Properties";
import Warehouse from "./pages/WhatWeDoPage/Warehouse";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/whoweserve" element={<WhoweServe />} />
      <Route path="/why-us" element={<WhyUs />} />
      <Route path="/key-benefits" element={<Key />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/trucks" element={<Trucks />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/nature-of-enquiry" element={<Nature />} />
      <Route path="/enquiries" element={<Enquiries />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/news-letters" element={<NewsLetter />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/addnewserve" element={<NewServe />} />
      <Route path="/addnewkey" element={<NewKey />} />
      <Route path="/addnewwhy" element={<NewWhy />} />
      <Route path="/addnewcompany" element={<NewCompany />} />
      <Route path="/addnewtruck" element={<NewTruck />} />
      <Route path="/addnewcategory" element={<NewCategory />} />
      <Route path="/addnewproduct" element={<NewProduct />} />
      <Route path="/:id" element={<EditCategory />} />
      <Route path="/key/:keyid" element={<EditKey />} />
      <Route path="/edit/:editid" element={<EditCompany />} />
      <Route path="truckedit/:truckid" element={<EditTrucks />} />
      <Route path="/whyusedit/:whyusid" element={<EditWhyUs />} />
      <Route path="/editcategory/:categoryid" element={<EditCategory />} />
      <Route path="/editProduct/:Productid" element={<EditProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/warehouse" element={<Warehouse />} />
    </Routes>
  );
}

export default App;
