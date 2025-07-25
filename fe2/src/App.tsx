import ProductList from "./component/ProductList";
import "./App.css";
import CategoryList from "./component/CategoryList";
import BrandList from "./component/BrandList";
import UserList from "./component/UserList";
import OrderList from "./component/OrderList";

function App() {
  return (
    <div>
      <ProductList />
      <CategoryList />
      <BrandList />
      <UserList />
      <OrderList/>                                                                  
      
    </div>
  );
}

export default App;