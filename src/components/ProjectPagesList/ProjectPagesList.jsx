
import { graphql } from '@apollo/client/react/hoc'
import { Col, List, notification, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { compose } from 'redux'

import { projectPageMutationGQL, projectPageQueryGQL } from '@/graphQL'
import ListItem from '@/components/ListItem'

const ProjectPagesList = ({
    intl,
    GetProjectPagesByUserId,
    DeleteProjectPage,
    pageOnChange,
    currentPage,
    pageSize,
}) => {
    const navigate = useNavigate()
    const toProjectPageHandler = projectPage => {
        navigate(`/projects/${projectPage.projectPageId}`)
    }
    return (
        <Col span={12}>
            <List
                className='projectsList'
                loading={GetProjectPagesByUserId?.loading}
                bordered
                size='large'
                dataSource={GetProjectPagesByUserId?.GetAllProjectPagesByUserID?.projectPages}
                pagination={{
                    onChange: pageOnChange,
                    total: GetProjectPagesByUserId?.GetAllProjectPagesByUserID?.countRows,
                    current: +currentPage,
                    defaultCurrent: 1,
                    defaultPageSize: pageSize,
                    responsive: true,
                }}
                itemLayout='vertical'
                renderItem={(projectPage, index) => (
                    <ListItem
                        itemIndex={index}
                        handleDelete={
                            () => DeleteProjectPage({ variables: { projectID: projectPage.projectPageId } })
                        }
                        label={`${projectPage.title}`}
                        handleClick={() => toProjectPageHandler(projectPage)}
                        key={index}
                        render={() => { }}
                    />
                )}
            />

        </Col>
    )
}

const ProjectPagesListContainer = ({
    userId,
}) => {
    const intl = useIntl()
    const [page, setPage] = useState(1)
    const pageSize = '5'
    const pageOnChange = page => {
        setPage(page)
    }
    const WithGraphQL = compose
        (graphql(
            projectPageQueryGQL.GET_PROJECT_PAGES_BY_USER_ID,
            {
                name: 'GetProjectPagesByUserId',
                options: props => {
                    return {
                        variables: {
                            userID: props.userId,
                            page: String(props.currentPage),
                            pageSize: String(props.pageSize),
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
            },
            graphql(
                projectPageMutationGQL.DELETE_PROJECT_PAGE,
                {
                    options: props => {
                        return {
                            onCompleted: () => {
                                notification.success({ description: props.intl.formatMessage({ id: 'notification.project_page_deleted_success' }) })
                            },
                            onError: error => {
                                notification.error({
                                    message: props.intl.formatMessage({ id: 'notification.error_message' }),
                                    description: error?.message,
                                })
                            },
                        }
                    },
                    name: 'DeleteProjectPage',
                },
            ),
        ),
        )(ProjectPagesList)
    return <WithGraphQL
        intl={intl}
        userId={userId}
        pageOnChange={pageOnChange}
        currentPage={page}
        pageSize={pageSize}
    />
}

export default ProjectPagesListContainer