import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Products from "./pages/Products"
import SinlgeProduct from "./pages/SingleProduct"
import Layout from "./component/Layout"
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist"

const App = ()=>{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <Products/>,
            },
            {
              path: ":id",
              element: <SinlgeProduct/>
            },
          ]
        },
        {
          path: "wishlist",
          element: <Wishlist/>
        }
      ]
    }
  ])
  return (
    < >
      {/* <h1 className="bg-red-500">Hello</h1>
      <Button>Click me</Button> */}
      <RouterProvider router={router}/>
    </>
  )
}
export default App;