import { useQuery } from "@tanstack/react-query";
import { Table, Typography, Tag } from "antd";

const { Title } = Typography;

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customer: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

function OrderList() {
  const fetchOrders = async (): Promise<Order[]> => {
    const res = await fetch("http://localhost:3001/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const { data = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (total: number) => `${total.toLocaleString("vi-VN")} ₫`,
      sorter: (a: Order, b: Order) => a.total - b.total,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "Đã giao") color = "green";
        else if (status === "Đang xử lý") color = "orange";
        else color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleString("vi-VN", {
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  return (
    <div>
      <Title level={3}>Danh sách đơn hàng</Title>
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

export default OrderList;