import React, { useEffect, useState } from 'react';
import { Pagination, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { User } from './UserTable';
import styled from 'styled-components';

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

interface DataType {
  id: string;
  owner: User;
  content: string;
  createdAt: Date;
  action: string[];
}

export type Comment = {
  id: string;
  owner: User;
  content: string;
  createdAt: Date;
}

const getAllCommentsUrl = "http://localhost:4000/comment/all";
const getAllCommentsWithPagination5Url = (page: number) => `http://localhost:4000/comment/all/${page}/5`;
const getAllCommentsWithPagination10Url = (page: number) => `http://localhost:4000/comment/all/${page}/10`;
const deleteCommentUrl = (id:string) =>  `http://localhost:4000/comment/delete/${id}`;


const CommentTable = ({ setVisible }: { setVisible: (a: boolean) => void} ): JSX.Element => {

  const [tableElements, setTableElements] = useState<DataType[]>();
  const [tableSize, setTableSize] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updateTable, setUpdateTable] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

    useEffect(() => {
      axios.get(getAllCommentsWithPagination5Url(currentPage-1), config).then((response) => {
        setTableSize(response.data.count);
        const element: DataType[] = response.data.comments.map((comment:any) => {
          const commentObject: DataType = {
            id: comment._id,
            content: comment.content,
            owner: comment.owner.username || "",
            createdAt: comment.createdAt,
            action: ['Delete'],
          }
          return commentObject;
        })
        setTableElements(element);
      });
    }, [updateTable, currentPage]);

    const deleteHandler = (index: number) => {
      if (!!tableElements && tableElements.length > 0) {
        axios.delete(deleteCommentUrl(tableElements[index].id),
          {
            ...config,
          }).then(()=>{
            setUpdateTable(!updateTable);
            setVisible(true);
            setTimeout(() => {setVisible(false)}, 4000);
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
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
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
                deleteHandler(index);  
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
    {tableElements && <Table columns={columns} dataSource={tableElements} pagination={false} />}
    <StyledPagination current={currentPage} total={tableSize*2} onChange={(page) => setCurrentPage(page)}/>
    </div>
    )
};

export default CommentTable;