import React from 'react'

import { PageLayout } from '@/layouts'

import Loader from '@/components/Loader'

import { Card, Heading } from './components'

export default () => {
  return (
    <PageLayout>
      <Card>
        <Heading id="welcome">Welcome to Robbo Student Account!</Heading>
        {/* <Loader /> */}
      </Card>
    </PageLayout>
  )
}
