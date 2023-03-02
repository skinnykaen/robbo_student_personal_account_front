import React, { useState } from 'react'
import { Col, Layout, Row } from 'antd'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'

import SideBar from '@/components/SideBar'
import SelectLanguage from '@/components/SelectLanguage'

const { Header, Sider, Content } = Layout

const PageLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout>
            <Sider
                trigger={null} collapsible
                collapsed={collapsed} theme='light'
            >
                <SideBar />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: 'green' }}>
                    <Row justify='space-between' align='middle'>
                        <Col span={12}>
                            {
                                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })
                            }
                        </Col>
                        <Col span={12}>
                            <SelectLanguage />
                        </Col>
                    </Row>

                </Header>
                <Content style={{ padding: '0 1rem' }}>
                    {
                        children
                    }
                </Content>
            </Layout>
        </Layout >
    )
}

export default PageLayout