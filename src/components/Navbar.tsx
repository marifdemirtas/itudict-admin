import React, { useState } from 'react';
import { CommentOutlined, ProfileOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledNavbar = styled.div`
    width: 100%;
`;

const StyledDiv = styled.div`
    margin-left: 300px;
`;


const items: MenuProps['items'] = [
  {
    label: 'Users',
    key: 'panel',
    icon: <StyledDiv><ProfileOutlined /></StyledDiv>,
  },
  {
    label: 'Comments',
    key: 'comment',
    icon: <CommentOutlined />,
  },
  {
    label: 'Topics',
    key: 'topic',
    icon: <BarsOutlined />,
  },
  {
    label: 'Settings',
    key: 'setting',
    icon: <SettingOutlined />,
  },
];

const Navbar = ():JSX.Element => {
  const [current, setCurrent] = useState('mail');

  const navigate = useNavigate();


  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
    setCurrent(e.key);
  };
  return (
    <StyledNavbar>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </StyledNavbar>
  );
};


export default Navbar;