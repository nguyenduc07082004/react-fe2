import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Typography } from "antd";

const { Title } = Typography;

interface Order {
  id: number;
  customer: string;
  total: number;
  status: string;
}

const OrderList: React.FC = () => {
  const fetchOrders = async (): Promise<Order[]> => {
    const res = await fetch("http://localhost:3001/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (value: number) => `${value.toLocaleString("vi-VN")} ₫`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <Title level={3}>Danh sách đơn hàng</Title>

      {isError && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderList;
