import { useQuery } from "@tanstack/react-query";
import { Image, Table, Typography } from "antd";

const { Title } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProductList() {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };

  const { data = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString("vi-VN")} ₫`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (src: string, record: Product) => (
  src ? <Image src={src} width={120} alt={record.name} /> : "Không có ảnh"
),

    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
  ];

  return (
    <div>
      <Title level={3}>Danh sách sản phẩm</Title>

      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ProductList;
