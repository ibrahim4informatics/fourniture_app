
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
import Customers from "./pages/dashboard/customers"
import ShowCustomerDetails from "./pages/dashboard/customers/show"

const routes = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <h1>Error</h1> },
  { path: "/cart", element: <Cart />, errorElement: <h1>Error</h1> },
  { path: "/login", element: <Login />, errorElement: <h1>Error</h1> },
  { path: "/register", element: <Cart />, errorElement: <h1>Error</h1> },
  { path: "/checkout", element: <Checkout />, errorElement: <h1>Error</h1> },
  { path: "/wishlist", element: <Wishlist />, errorElement: <h1>Error</h1> },
  { path: "/user", element: <User />, errorElement: <h1>Error</h1> },
  { path: "/admin", element: <Overview />, errorElement: <h1>Error</h1> },
  { path: "/admin/customers", element: <Customers />, errorElement: <h1>Error</h1> },
  {path:"/admin/customers/:id", element:<ShowCustomerDetails/>, errorElement:<h1>Error</h1>},
  { path: "/shop", element: <Shop />, errorElement: <h1>Error</h1> },
  { path: "/shop/:id", element: <SingleProduct />, errorElement: <h1>Error</h1> },
])
function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
