import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/homeMain/home";
import Login from "./component/account/Login";
import Register from "./component/account/Register";
import ProductFilter from "./component/shopProduct/ProductFilter";
import AccountInformation from "./component/account/AccountInformation";
import ChangePassword from "./component/account/ChangePassword";
import ProductDetail from "./component/shopProduct/ProductDetail";
import ProductByCategory from "./component/shopProduct/ProductByCategory";
import MyShop from "./component/shopProduct/MyShop";
import Shop from "./component/shopProduct/Shop";
import ProductByShop from "./component/shopProduct/ProductByShop";
import ShowCart from "./component/card/ShowCart";
import ShowOrder from "./component/order/ShowOrder";
import ShowOrderDetail from "./component/order/ShowOrderDetail";
import AccountManager from "./component/admin/AccountManager";
import RevenueByYear from "./component/order/RevenueByYear";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={"/product"} element={<ProductFilter/>}></Route>
                <Route path={"/productBy/:id"} element={<ProductByCategory/>}></Route>
                <Route path={"/productNameSearch/nameSearch=:nameSearch"} element={<ProductByCategory/>}></Route>
                <Route path={"/accountInformation"} element={<AccountInformation/>}></Route>
                <Route path={"/changePassword"} element={<ChangePassword/>}></Route>
                <Route path={"/productDetail/:id"} element={<ProductDetail/>}></Route>
                <Route path={"/shop"} element={<MyShop/>}></Route>
                <Route path={"/getAllShop"} element={<Shop/>}></Route>
                <Route path={"/productByShop/:id"} element={<ProductByShop/>}></Route>
                <Route path={"/cart"} element={<ShowCart/>}></Route>
                <Route path={"/order"} element={<ShowOrder/>}></Route>
                <Route path={"/orderDetail/:id"} element={<ShowOrderDetail/>}></Route>
                <Route path={"/admin"} element={<AccountManager/>}></Route>
                <Route path={"/revenueByYear"} element={<RevenueByYear/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
