import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Typography } from "antd";

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  };

  const { data = [], isLoading, isError, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <Title level={3}>Danh sách người dùng</Title>

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

export default UserList;
