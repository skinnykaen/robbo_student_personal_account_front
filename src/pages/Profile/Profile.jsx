import React, { useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { notification } from 'antd'

import PageLayout from '@/components/PageLayout'
import Loader from '@/components/Loader'
import Flex from '@/components/Flex'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { getProfileState } from '@/reducers/profile'
import { getProfileById, clearProfileState, updateProfile } from '@/actions'
import { checkAccess, useUserIdentity, useActions } from '@/helpers'
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, STUDENT } from '@/constants'


export default memo(() => {
    const { userRole, isAuth, loginLoading } = useUserIdentity()
    if (!loginLoading && !checkAccess(userRole, [STUDENT])) {
        return <Redirect to={HOME_PAGE_ROUTE} />
    } else if (!isAuth && !loginLoading) {
        return <Redirect to={LOGIN_PAGE_ROUTE} />
    }

    const actions = useActions({
        getProfileById,
        clearProfileState,
        updateProfile,
    }, [])

    useEffect(() => {
        if (!loginLoading && checkAccess(userRole, [STUDENT]))
            actions.getProfileById()
        return () => actions.clearProfileState()

    }, [loginLoading])

    const { loading, profile, err } = useSelector(({ profile }) => getProfileState(profile))
    if (!loading && err !== null) {
        notification.error({ message: 'Ошибка', description: err })
    }

    return (
        <PageLayout>
            Profile
            {
                (loading || loginLoading)
                    ? <Loader />
                    : (
                        <Flex direction='column'>
                            <Flex margin='0.5rem' justify='flex-end'>
                                <ProfileCard updateHandle={actions.updateProfile} profile={profile} />
                            </Flex>
                        </Flex>
                    )
            }
        </PageLayout >
    )
})