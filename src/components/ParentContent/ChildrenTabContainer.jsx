import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { notification } from 'antd'
import { compose } from 'redux'
import { graphql } from '@apollo/client/react/hoc'

import ChildrenTab from './ChildrenTab'

import { studentQuerysGQL } from '@/graphQL'


const ChildrenTabContainer = ({
    parentId,
}) => {
    const [email, setEmail] = useState('')
    const SearchStudent = value => {
        setEmail(value)
    }
    const intl = useIntl()

    const WithGraphQLComponent = compose(
        graphql(
            studentQuerysGQL.GET_STUDENTS_BY_PARENT_ID,
            {
                options: props => {
                    return {
                        variables: {
                            parentId: props.parentId,
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
                name: 'GetStudents',
            },
        ),
        graphql(
            studentQuerysGQL.SEARCH_STUDENTS_BY_EMAIL,
            {
                options: props => {
                    return {
                        variables: {
                            email: props.email || 'undenfined',
                            // page: "1",
                            // pageSize: "5",
                            parentId: props.parentId,
                        },
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }
                },
                name: 'SearchStudentsResult',
            },
        ))(ChildrenTab)

    return <WithGraphQLComponent
        parentId={parentId}
        email={email}
        SearchStudent={SearchStudent}
    />
}


export default ChildrenTabContainer