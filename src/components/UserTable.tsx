import React, { useEffect, useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Comment } from './CommentTable';
import axios from 'axios';
import {Input} from 'antd';
import styled from 'styled-components';
import { BACKEND_API_URL } from "../utils/constants";

const {Search} = Input;

const StyledPagination = styled(Pagination)`
  background: white;
  width: 380px;
  border-radius: 5px;
  margin-left: auto;
  margin-top: 20px;
  .ant-pagination-options{
    display: none !important;
  }
`;

const StyledSearch = styled(Search)`
  width: 300px;
  margin-right: auto;
  display: flex;
  margin-bottom: 20px;
`;

interface DataType {
  username?: string,
  commentCount: number,
  topicCount: number,
  likedCount: number,
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

const getUserWithFilterUrl = (key: any, page: any, limit: any) => {return `${BACKEND_API_URL}/user/filter/${page}/${limit}`}
const banUserUrl = `${BACKEND_API_URL}/user/banUser`;
const promoteUserUrl = `${BACKEND_API_URL}/user/promoteUser`;
const demoteUserUrl = `${BACKEND_API_URL}/user/demoteUser`;

const UserTable = ():JSX.Element => {
  const [tableElements, setTableElements] = useState<DataType[]>();
  const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [tableSize, setTableSize] = useState<number>(0);

  const token = sessionStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
      axios.get(getUserWithFilterUrl(searchKey, page, 5), {
        ...config,
        params: {
          key: searchKey,
        }
      }).then((response) => {
        setTableSize(response.data.count);
        const element: DataType[] = response.data.users.map((user:any) => {
          const userObject: DataType = {
            username: user.username,
            role: user.role,
            email: user.email,
            commentCount: user.comments.length,
            topicCount: user.liked_comments.length,
            likedCount: user.topics.length,
            createdAt: user.createdAt.toString().slice(0, 10),
            actions: user.role.toUpperCase() === "SENIOR" ? ["Demote"] : ["Promote"],
            action: ['Ban'],
          }
          return userObject;
        })
        setTableElements(element);
      });
    }, [updateTable, page, searchKey]);

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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Number of Comments',
        dataIndex: 'commentCount',
        key: 'commentCount',
        width: "50px",
      },
      {
        title: 'Number of Topics',
        dataIndex: 'topicCount',
        key: 'topicCount',
        width: "50px",
      },
      {
        title: 'Number of Likes',
        dataIndex: 'likedCount',
        key: 'likedCount',
        width: "50px",
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
    
    const onSearch = (key: string) => {
      setSearchKey(key);
    }

    return (
    <div>
      <StyledSearch placeholder="input search text" allowClear onSearch={(event) => onSearch(event)} />
      {tableElements && <Table columns={columns} dataSource={tableElements} pagination={false}/>}
      <StyledPagination current={page} total={tableSize*2} onChange={(page) => setPage(page)}/>
      
    </div>
    )
};

export default UserTable;