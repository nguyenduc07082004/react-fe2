import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./component/ProductList";
import "./App.css"
import OrderList from "./component/OrderList";
import BrandList from "./component/BrandList";
import CategoryList from "./component/CategoryList";
import UserList from "./component/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Trang chủ</h1>,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
  {
    path: "/brands",
    element: <BrandList />,
  },
  {
    path: "/oderlist",
    element: <OrderList />,
  }
  
]);

function App () {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;