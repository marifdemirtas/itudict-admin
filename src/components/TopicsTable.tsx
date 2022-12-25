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
  title: string;
  count: number;
  owner: User;
  createdAt: Date;
  action: string[];
}

const getAllTopicsWithPagination5Url = (page: number) => `http://localhost:4000/topic/paginated/${page}/5`;
const getAllTopicsWithPagination10Url = (page: number) => `http://localhost:4000/comment/all/${page}/10`;
const deleteTopicUrl = "http://localhost:4000/topic/delete";


const TopicTable = ():JSX.Element => {
  const [tableElements, setTableElements] = useState<DataType[]>();
  const [tableSize, setTableSize] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updateTable, setUpdateTable] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

    useEffect(() => {
      axios.get(getAllTopicsWithPagination5Url(currentPage-1), config).then((response) => {
        setTableSize(response.data.count);
        const element: DataType[] = response.data.topics.map((topic:any) => {
          const topicObject: DataType = {
            id: topic._id,
            title: topic.title,
            count: topic.comment_count,
            owner: topic.owner.username,
            createdAt: topic.createdAt,
            action: ['Delete'],
          }
          return topicObject;
        })
        setTableElements(element);
      });
    }, [updateTable, currentPage]);

    const deleteHandler = (index: number) => {
      // if (!!tableElements && tableElements.length > 0) {
      //   axios.post(deleteCommentUrl, {},
      //     {
      //       ...config,
      //       params: {
      //         email: tableElements[index].email
      //       }
      //     }).then(()=>{
      //       setUpdateTable(!updateTable);
      //     }
      //     )
      // }
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Number of Comments',
        dataIndex: 'count',
        key: 'count',
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

export default TopicTable;