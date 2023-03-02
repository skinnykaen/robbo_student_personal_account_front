import React from 'react'
import { Menu } from 'antd'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import {
    SidebarDataStudent,
} from './SideBarData.jsx'

import { authMutationsGQL, graphQLClient } from '@/graphQL/index.js'
import { parseJwt } from '@/helpers'
import { LOGIN_PAGE_ROUTE } from '@/constants'

export default ({ selectedNavBarKey = '1' }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { Role } = parseJwt(token)
    let SideBarData = []
    switch (Role) {
        case 0: {
            SideBarData = SidebarDataStudent
            break
        }
    }

    const [loginOut] = useMutation(authMutationsGQL.SING_OUT, {
        onCompleted: ({ SingIn }) => {
            graphQLClient.resetStore()
            localStorage.removeItem('token')
            navigate(LOGIN_PAGE_ROUTE)
        },
    })

    const onMenuClick = ({ item, key }) => {
        if (item.props.pathname === LOGIN_PAGE_ROUTE) {
            loginOut()
        }
        else {
            navigate(item.props.pathname, { state: { selectedNavBarKey: key } })
        }

    }
    return (
        <Menu
            theme='light'
            mode='inline'
            selectedKeys={[selectedNavBarKey]}
            onClick={onMenuClick}
            items={SideBarData}
        />
    )
}