import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect, useSearchParams } from 'react-router-dom'
import { Button, List, Row, Col, Pagination } from 'antd'

import ProjectPageItem from './MyProjectsItem'

import PageLayout from '@/components/PageLayout'
import Loader from '@/components/Loader'
import { getProjectPagesState } from '@/reducers/myProjects'
import { getProjectPagesByAccessToken, clearMyProjectsState, createProjectPage } from '@/actions'
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, STUDENT } from '@/constants'
import { checkAccess, useUserIdentity, useActions } from '@/helpers'

export default ({ match }) => {
    const { userRole, isAuth, loginLoading } = useUserIdentity()
    const params = useSearchParams()
    console.log(match)
    const actions = useActions({
        getProjectPagesByAccessToken,
        clearMyProjectsState,
        createProjectPage,
    }, [])

    useEffect(() => {
        if (!loginLoading && checkAccess(userRole, [STUDENT]))
            actions.getProjectPagesByAccessToken()
        return () => actions.clearMyProjectsState()
    }, [loginLoading])

    if (!loginLoading && !checkAccess(userRole, [STUDENT])) {
        return redirect(HOME_PAGE_ROUTE)
    } else if (!isAuth && !loginLoading) {
        return redirect(LOGIN_PAGE_ROUTE)
    }

    const { projectPages, countRows, loading } = useSelector(({ myProjects }) => getProjectPagesState(myProjects))

    return (
        <PageLayout>
            {
                loginLoading || loading ? <Loader />
                    : (
                        <React.Fragment>
                            <Row style={{ margin: '0.5rem' }}>
                                <Col span={24}>Мои проекты</Col>
                                <Col span={24}>
                                    <Button
                                        type='primary' onClick={() => actions.createProjectPage()}>
                                        Создать новый
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    {
                                        loading
                                            ? <Loader />
                                            : <List
                                                bordered
                                                dataSource={projectPages}
                                                renderItem={(projectPage, index) => (
                                                    <ProjectPageItem
                                                        projectPage={projectPage}
                                                        projectPageIndex={index}
                                                        key={index}
                                                    />
                                                )}
                                            />
                                    }
                                </Col>
                                <Col span={24}>
                                    <Pagination
                                        defaultCurrent={1} defaultPageSize={4}
                                        total={countRows}
                                        onChange={(page, pageSize) => { console.log(page, pageSize) }}
                                    />
                                </Col>
                            </Row>
                        </React.Fragment>
                    )
            }
        </PageLayout >
    )
}