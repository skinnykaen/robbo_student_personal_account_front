import React from 'react'
import * as FaIcons from 'react-icons/fa'

import {
  UserOutlined,
  BookOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from '@ant-design/icons'

import {
  LOGIN_PAGE_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_COURSES_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '@/constants'

export const SidebarDataStudent = [
  {
    key: '1',
    label: 'Профиль',
    pathname: PROFILE_PAGE_ROUTE,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: 'Мои проекты',
    pathname: MY_PROJECTS_ROUTE,
    icon: <ProjectOutlined />,
  },
  {
    key: '3',
    label: 'Платежи',
    pathname: '/payments',
    icon: <CreditCardOutlined />,
  },
  {
    key: '4',
    label: 'Программа',
    pathname: '/program',
    icon: <FaIcons.FaTasks />,
  },
  {
    key: '5',
    label: 'Мои курсы',
    pathname: MY_COURSES_ROUTE,
    icon: <BookOutlined />,
  },
  {
    key: '6',
    label: 'Информер',
    pathname: '/informer',
    icon: <FaIcons.FaInfo />,
  },
  {
    key: '7',
    label: 'Выйти',
    pathname: LOGIN_PAGE_ROUTE,
    icon: <LogoutOutlined />,
  },
]