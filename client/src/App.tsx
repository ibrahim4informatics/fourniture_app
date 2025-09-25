
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Shop from "./pages/shop"
import Cart from "./pages/cart"
import SingleProduct from "./pages/single-product"
import User from "./pages/user"
import Wishlist from "./pages/wishlist"
import Checkout from "./pages/checkout"
import Login from "./pages/login"
import Overview from "./pages/dashboard/overview"
import CustomersManagement from "./pages/dashboard/customer-management"
import Error from "./pages/error"
import ProductsManagement from "./pages/dashboard/products-management"

const routes = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/cart", element: <Cart />, errorElement: <Error /> },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Cart />, errorElement: <Error /> },
  { path: "/checkout", element: <Checkout />, errorElement: <Error /> },
  { path: "/wishlist", element: <Wishlist />, errorElement: <Error /> },
  { path: "/user", element: <User />, errorElement: <Error /> },
  {
    path: "/admin", errorElement: <Error />, children: [
      { path: "", element: <Overview />, index:true },
      { path: "customers", element: <CustomersManagement /> },
      { path: "products", element: <ProductsManagement /> },
    ]
  },
  { path: "/shop", element: <Shop />, errorElement: <Error /> },
  { path: "/shop/:id", element: <SingleProduct />, errorElement: <Error /> },
])
function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
