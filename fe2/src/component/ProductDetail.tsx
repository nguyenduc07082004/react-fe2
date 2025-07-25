// component/ProductDetail.tsx
import { useParams } from "react-router-dom";

const products = [
  { id: "1", name: "iPhone 15 Pro Max" },
  { id: "2", name: "Samsung Galaxy S24 Ultra" },
  { id: "3", name: "Xiaomi 14" },
];

function ProductDetail() {
  const { id } = useParams(); // Lấy id từ URL

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2>Sản phẩm không tồn tại</h2>;
  }

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <p>ID: {product.id}</p>
      <p>Tên: {product.name}</p>
    </div>
  );
}

export default ProductDetail;
