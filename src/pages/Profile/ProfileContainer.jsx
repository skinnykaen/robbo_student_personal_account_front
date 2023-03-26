import React from 'react'
import { notification } from 'antd'
import { compose } from 'redux'
import { graphql } from '@apollo/client/react/hoc'
import { useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'

import StudentProfile from './StudentProfile'
import SuperAdminProfile from './SuperAdminProfile'

import {
    profileGQL,
    studentMutationsGQL,
    superAdminMutationsGQL,
} from '@/graphQL'
import { STUDENT, SUPER_ADMIN } from '@/constants'
import { checkAccess } from '@/helpers'

const ProfileContainer = ({
    userId,
    userRole,
}) => {
    const intl = useIntl()
    const location = useLocation()
    const peekUserId = location?.state?.userId
    const peekUserRole = location?.state?.userRole
    let Profile

    if (peekUserId) {
        // case when a user peek profile of another user
        switch (peekUserRole) {
            case STUDENT:
                return <WithGraphQLStudentPeekProfile
                    intl={intl}
                    peekUserId={peekUserId}
                    peekUserRole={peekUserRole}
                    accessUpdate={!checkAccess(userRole, [SUPER_ADMIN])}
                />
        }
    } else {
        switch (userRole) {
            case STUDENT:
                Profile = compose(
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
            case SUPER_ADMIN:
                Profile = compose(
                    graphql(profileGQL.GET_USER, {
                        onError: error => {
                            notification.error({
                                message: intl.formatMessage({ id: 'notification.error_message' }),
                                description: error?.message,
                            })
                        },
                    }),
                    graphql(superAdminMutationsGQL.UPDATE_SUPER_ADMIN,
                        {
                            name: 'UpdateSuperAdmin',
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
                )(SuperAdminProfile)
                return <Profile />
        }
    }
}

const WithGraphQLStudentPeekProfile = compose(
    graphql(
        profileGQL.GET_USER,
        {
            options: props => {
                return {
                    variables: {
                        peekUserId: props.peekUserId,
                        peekUserRole: props.peekUserRole,
                    },
                    onError: error => {
                        notification.error({
                            message: props.intl.formatMessage({ id: 'notification.error_message' }),
                            description: error?.message,
                        })
                    },
                }
            },
        },
    ),
    graphql(studentMutationsGQL.UPDATE_STUDENT,
        {
            name: 'UpdateStudent',
            options: props => {
                return {
                    onCompleted: () => {
                        notification.success({ description: 'Профиль успешно обновлен!' })
                    },
                    onError: error => {
                        notification.error({
                            message: props.intl.formatMessage({ id: 'notification.error_message' }),
                            description: error?.message,
                        })
                    },
                }
            },
        },
    ),
    graphql(studentMutationsGQL.SET_ACTIVE_FOR_STUDENT,
        {
            name: 'SetActive',
            options: props => {
                return {
                    onCompleted: () => {
                        notification.success({ description: 'Профиль успешно обновлен!' })
                    },
                    onError: error => {
                        notification.error({
                            message: props.intl.formatMessage({ id: 'notification.error_message' }),
                            description: error?.message,
                        })
                    },
                }
            },
        },
    ),
)(StudentProfile)

export default ProfileContainer