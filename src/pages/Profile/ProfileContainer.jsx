import React from 'react'
import { notification } from 'antd'
import { compose } from 'redux'
import { graphql } from '@apollo/client/react/hoc'
import { useIntl } from 'react-intl'

import StudentProfile from './StudentProfile'

import {
    profileGQL,
    studentMutationsGQL,
} from '@/graphQL'

const ProfileContainer = ({
    userId,
    userRole,
}) => {
    const intl = useIntl()
    const Profile = compose(
        graphql(profileGQL.GET_USER,
            {
                onError: error => {
                    notification.error({
                        message: intl.formatMessage({ id: 'notification.error_message' }),
                        description: error?.message,
                    })
                },
            }),
        graphql(studentMutationsGQL.UPDATE_STUDENT,
            {
                name: 'UpdateStudent',
                options: {
                    onCompleted: () => {
                        notification.success({ description: intl.formatMessage({ id: 'notification.update_profile_success' }) })
                    },
                    onError: error => {
                        notification.error({
                            message: intl.formatMessage({ id: 'notification.error_message' }),
                            description: error?.message,
                        })
                    },
                },
            },
        ),
    )(StudentProfile)
    return <Profile />
}

export default ProfileContainer