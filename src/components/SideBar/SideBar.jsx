import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'

import {
    SidebarDataStudent,
} from './SideBarData.jsx'

import { useActions } from '@/helpers/useActions'
import { getLoginState } from '@/reducers/login'


export default () => {
    const history = useHistory()
    const { signOutRequest } = useActions()
    const { userRole } = useSelector(({ login }) => getLoginState(login))

    let SideBarData = []
    switch (userRole) {
        case 0: {
            SideBarData = SidebarDataStudent
            break
        }
    }

    const onMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        if (item.props.pathname === '/login') {
            signOutRequest()
            history.push(item.props.pathname)
        }
        else {
            history.push(item.props.pathname)
        }

    }

    return (
        <Menu
            theme='light'
            mode='inline'
            onClick={onMenuClick}
            items={SideBarData}
        />
    )
}