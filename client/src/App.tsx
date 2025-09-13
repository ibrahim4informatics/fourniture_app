
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Shop from "./pages/shop"
import Cart from "./pages/cart"
import SingleProduct from "./pages/single-product"
import User from "./pages/user"
import Wishlist from "./pages/wishlist"
import Checkout from "./pages/checkout"

const routes = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <h1>Error</h1> },
  { path: "/shop", element: <Shop />, errorElement: <h1>Error</h1> },
  { path: "/cart", element: <Cart />, errorElement: <h1>Error</h1> },
  { path: "/checkout", element: <Checkout />, errorElement: <h1>Error</h1> },
  { path: "/wishlist", element: <Wishlist />, errorElement: <h1>Error</h1> },
  { path: "/user", element: <User />, errorElement: <h1>Error</h1> },
  { path: "/shop/:id", element: <SingleProduct />, errorElement: <h1>Error</h1> },
])
function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
