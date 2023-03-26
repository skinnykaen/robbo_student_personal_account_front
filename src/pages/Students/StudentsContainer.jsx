import React from 'react'
import { notification } from 'antd'
import { graphql } from '@apollo/client/react/hoc'
import { useSearchParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { compose } from 'redux'

import Students from './Students'

import { studentMutationsGQL, studentQuerysGQL } from '@/graphQL'

const StudentsContainer = () => {
    const intl = useIntl()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || '1'
    const pageSize = '5'

    const onChangePage = page => {
        setSearchParams({ page })
    }

    const WithGraphQLComponent = compose(
        graphql(
            studentQuerysGQL.GET_ALL_STUDENTS,
            {
                options: props => {
                    return {
                        variables: {
                            page: props.currentPage,
                            pageSize: props.pageSize,
                            active: true,
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
                name: 'GetAllStudents',
            }),
        graphql(
            studentQuerysGQL.GET_ALL_STUDENTS,
            {
                options: props => {
                    return {
                        variables: {
                            page: props.currentPage,
                            pageSize: props.pageSize,
                            active: false,
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
                name: 'GetAllNotActiveStudents',
            }),
        graphql(
            studentMutationsGQL.DELETE_STUDENT,
            {
                options: props => {
                    return {
                        onCompleted: () => {
                            notification.success({ description: intl.formatMessage({ id: 'notification.student_delete_success' }) })
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
                name: 'DeleteStudent',
            }),
    )
        (Students)

    return (
        <WithGraphQLComponent
            intl={intl}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={onChangePage}
        />
    )
}

export default StudentsContainer