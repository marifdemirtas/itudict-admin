import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Topic } from './TopicsTable';
import { Comment } from './CommentsTable';

interface DataType {
  key: string;
  nickname: string;
  role: string;
  address: string;
  actions: string[];
  action: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'nickname',
    key: 'nickname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    render: (_, { actions }) => (
      <>
        {actions.map((action) => {
          let color = action ===  "Promote" ? 'geekblue' : 'green';
          if (action === 'Ban') {
            color = 'volcano';
          }
          const handleClick = (key: String) => {
            console.log(key);   
          }
          return (
            <Tag color={color} key={action} onClick={() => handleClick(action)}>
              {action.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <>
        {action.map((action) => {
          let color = 'black'
          const handleClick = (key: String) => {
            console.log(key);   
          }
          return (
            <Tag color={color} key={action} onClick={() => handleClick(action)}>
              {action.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  }
];

const data: DataType[] = [
  {
    key: '1',
    nickname: 'John Brown',
    role: "Junior",
    address: 'New York No. 1 Lake Park',
    actions: ['Promote', 'Ban'],
    action: ['Delete']
  },
  {
    key: '2',
    nickname: 'Jim Green',
    role: "Senior",
    address: 'London No. 1 Lake Park',
    actions: ['Demote', 'Ban'],
    action: ['Delete']
  },
  {
    key: '3',
    nickname: 'Joe Black',
    role: "Junior",
    address: 'Sidney No. 1 Lake Park',
    actions: ['Promote', 'Ban'],
    action: ['Delete']
  },
];

export type User = {
  username: string;
  email: string;
  password: string;
  comments: Comment[]; // Comments about the user
  liked_comments: Comment[]; // Liked comments
  topics: Topic[]; // Topics of the user
  role: string; // Role of the user
  isActive: boolean;
  createdAt: Date;
}

const UserTable = ():JSX.Element => {
    return (
    <Table columns={columns} dataSource={data} />
    )
};

export default UserTable;