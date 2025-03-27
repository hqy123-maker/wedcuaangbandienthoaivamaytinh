import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/ComHome'
import ThucDon from '@/components/ComThucDon'
import GioiThieu from '@/components/ComGioiThieu'
import LienHe from '@/components/ComLienHe'
import LichSu from '@/components/ComLichSu'
import ProductDetail from '@/components/ComProductDetail'
import Cart from '@/components/ComCart'
import Register from '@/components/ComRegister'
import Login from '@/components/ComLogin'
//Tạo mảng chứa đường link
const routes = [
    {
        //nếu chọn component nào loat lên đầu tien thì path:"/"
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/thucdon",
        name: "ThucDon",
        component: ThucDon
    },
    {
        path: "/gioithieu",
        name: "GioiThieu",
        component: GioiThieu
    },
    {
        path: "/lienhe",
        name: "LienHe",
        component: LienHe
    },
    {
        path: "/lichsu",
        name: "LichSu",
        component: LichSu
    },
    {
        path: "/product/:id",
        name: "ProductDetail",
        component: ProductDetail
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router