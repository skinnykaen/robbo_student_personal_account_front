import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'react-router-dom'

import { WelcomeText } from './components'
import CoursePageItem from './MyCoursesItem'

import PageLayout from '@/components/PageLayout'
import Loader from '@/components/Loader'
import { getAllCoursePages, clearAllCoursePagesState } from '@/actions'
import { getCoursePages, getCoursePagesLoading } from '@/reducers/myCourses'
import Flex from '@/components/Flex'
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, STUDENT, SUPER_ADMIN } from '@/constants'
import { checkAccess, useActions, useUserIdentity } from '@/helpers'

export default () => {
    const { userRole, isAuth, loginLoading } = useUserIdentity()

    const actions = useActions({ getAllCoursePages, clearAllCoursePagesState }, [])
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!loginLoading && checkAccess(userRole, [STUDENT, SUPER_ADMIN]))
            actions.getAllCoursePages(token)
        return () => actions.clearAllCoursePagesState()
    }, [loginLoading])

    const coursePages = useSelector(({ myCourses }) => getCoursePages(myCourses))
    const loading = useSelector(({ myCourses }) => getCoursePagesLoading(myCourses))

    if (!loginLoading && !checkAccess(userRole, [STUDENT, SUPER_ADMIN])) {
        return redirect(HOME_PAGE_ROUTE)
    } else if (!isAuth && !loginLoading) {
        return redirect(LOGIN_PAGE_ROUTE)
    }

    return (
        <PageLayout>
            {
                loginLoading ? <Loader />
                    : (
                        <Flex direction='column' align='center'>
                            <WelcomeText>Мои Курсы</WelcomeText>
                            {
                                loading
                                    ? <Loader />
                                    : coursePages?.map((coursePage, index) => {
                                        return (
                                            <CoursePageItem
                                                coursePage={coursePage}
                                                key={index}
                                            />
                                        )
                                    })
                            }
                        </Flex>
                    )
            }
        </PageLayout>
    )
}