import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Topic } from './TopicsTable';
import { Comment } from './CommentsTable';
import axios from 'axios';

interface DataType {
  id?: string;
  username?: string;
  role?: string;
  createdAt?: Date;
  actions?: string[];
  action?: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    render: (_, { actions }) => {
      return (
      <>
        {actions && 
        actions.map((action) => {
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
      </>)
    },
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => {
      return (
      <>
        {action && action.map((action) => {
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
      )
    },
  }
];

export type User = {
  id: string;
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


const url = "http://localhost:4000/user/all";

const UserTable = ():JSX.Element => {
    const [tableElements, setTableElements] = useState<DataType[]>();

    React.useEffect(() => {
      axios.get(url).then((response) => {
        const element: DataType[] = response.data.map((user:any) => {
          const userObject: DataType = {
            id: user._id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            actions: ["Ban", user.role === "Senior" ? "Demote" : "Promote"],
            action: ['Delete'],
          }
          return userObject;
        })

        setTableElements(element);
        
      });
    }, []);
    
    return (
    <div>
    {tableElements && <Table columns={columns} dataSource={tableElements} />}
    </div>
    )
};

export default UserTable;