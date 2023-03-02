import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  UserOutlined,
  BookOutlined,
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
    label: <FormattedMessage id='sidebar_data.profile' />,
    pathname: PROFILE_PAGE_ROUTE,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: <FormattedMessage id='sidebar_data.my_projects' />,
    pathname: MY_PROJECTS_ROUTE,
    icon: <ProjectOutlined />,
  },
  {
    key: '3',
    label: <FormattedMessage id='sidebar_data.my_courses' />,
    pathname: MY_COURSES_ROUTE,
    icon: <BookOutlined />,
  },
  {
    key: '4',
    label: <FormattedMessage id='sidebar_data.logout' />,
    pathname: LOGIN_PAGE_ROUTE,
    icon: <LogoutOutlined />,
  },
]