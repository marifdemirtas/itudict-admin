import React, { useContext, useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Comment } from './CommentTable';
import axios from 'axios';

interface DataType {
  id?: string;
  username?: string;
  role?: string;
  email?: string;
  createdAt?: Date;
  actions?: string[];
  action?: string[];
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  comments: Comment[]; // Comments about the user
  liked_comments: Comment[]; // Liked comments
  role: string; // Role of the user
  isActive: boolean;
  createdAt: Date;
}

const getUserUrl = "http://localhost:4000/user/all";
const banUserUrl = "http://localhost:4000/user/banUser";
const promoteUserUrl = "http://localhost:4000/user/promoteUser";
const demoteUserUrl = "http://localhost:4000/user/demoteUser";

const UserTable = ():JSX.Element => {
  const [tableElements, setTableElements] = useState<DataType[]>();
  const [updateTable, setUpdateTable] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
      axios.get(getUserUrl, config).then((response) => {
        const element: DataType[] = response.data.map((user:any) => {
          const userObject: DataType = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            actions: user.role.toUpperCase() === "SENIOR" ? ["Demote"] : ["Promote"],
            action: ['Ban'],
          }
          return userObject;
        })
        setTableElements(element);
      });
    }, [updateTable]);

    const promoteHandler = (index: any) => {
      if (!!tableElements && tableElements.length > 0) {
        axios.post(promoteUserUrl, {},
          {
            ...config,
            params: {
              email: tableElements[index].email
            }
          }).then(()=>{
            setUpdateTable(!updateTable);
          }
          )
      }
    }

    const demoteHandler = (index: any) => {
      if (!!tableElements && tableElements.length > 0) {
        axios.post(demoteUserUrl, {},
          {
            ...config,
            params: {
              email: tableElements[index].email
            }
          }).then(()=>{
            setUpdateTable(!updateTable);
          }
          )
      }    
    }

    const banHandler = (index: number) => {
      if (!!tableElements && tableElements.length > 0) {
        axios.post(banUserUrl, {},
          {
            ...config,
            params: {
              email: tableElements[index].email
            }
          }).then(()=>{
            setUpdateTable(!updateTable);
          }
          )
      }
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
        render: (_, { actions }, index) => {
          return (
          <>
            {actions && 
            actions.map((action) => {
              let color = action ===  "Promote" ? 'geekblue' : 'green';
              const handleClick = (key: String, index: any) => {
                if(key === "Promote") promoteHandler(index);  
                else if(key === "Demote") demoteHandler(index);  
              }
              return (
                <Tag color={color} key={action} onClick={() => handleClick(action, index)}>
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
        render: (_, { action }, index) => {
          return (
          <>
            {action && action.map((action) => {
              let color = 'volcano'
              const handleClick = (index: number) => {
                banHandler(index);  
              }
              return (
                <Tag color={color} key={action} onClick={() => handleClick(index)}>
                  {action.toUpperCase()}
                </Tag>
              );
            })}
          </>
          )
        },
      }
    ];
    

    return (
    <div>
    {tableElements && <Table columns={columns} dataSource={tableElements} />}
    </div>
    )
};

export default UserTable;