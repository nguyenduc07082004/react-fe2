import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Typography } from "antd";

const { Title } = Typography;

interface Brand {
  id: number;
  name: string;
}

const BrandList: React.FC = () => {
  const fetchBrands = async (): Promise<Brand[]> => {
    const res = await fetch("http://localhost:3001/brands");
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div>
      <Title level={3}>Danh sách thương hiệu</Title>

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

export default BrandList;
