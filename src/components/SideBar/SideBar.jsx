import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

import {
    SidebarDataStudent,
} from './SideBarData.jsx'

import { useActions } from '@/helpers'
import { getLoginState } from '@/reducers/login'
import { signOutRequest } from '@/actions'

export default () => {
    const history = useNavigate()
    const action = useActions({ signOutRequest }, [])
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
            action.signOutRequest()
            history(item.props.pathname)
        }
        else {
            history(item.props.pathname)
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