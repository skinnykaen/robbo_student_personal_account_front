import React, { memo } from 'react'
import { Redirect } from 'react-router-dom'

import { Heading } from './components'

import { PageLayout, Card } from '@/layouts'
import SideBar from '@/components/SideBar'

import { useUserIdentity } from '@/helpers'
import { LOGIN_PAGE_ROUTE } from '@/constants'

export default memo(() => {
  // eslint-disable-next-line no-unused-vars
  const { userRole, isAuth } = useUserIdentity()

  if (!isAuth) {
    return <Redirect to={LOGIN_PAGE_ROUTE} />
  }

  return (
    <PageLayout>
      <Card>
        <Heading id='welcome'>Welcome to Robbo Student Account!</Heading>
        <SideBar />
      </Card>
    </PageLayout>
  )
})
