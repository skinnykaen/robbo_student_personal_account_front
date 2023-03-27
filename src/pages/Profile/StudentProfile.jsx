import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Typography, Skeleton, Col } from 'antd'

import PageLayout from '@/components/PageLayout'
import ProfileCard from '@/components/ProfileCard'
import ProjectPagesListContainer from '@/components/ProjectPagesList'

const { Title } = Typography

const StudentProfile = ({
    data: {
        GetUser,
        loading,
    },
    peekUserId,
    UpdateStudent,
    SetActive,
    accessUpdate,
}) => {
    return (
        <PageLayout>
            <Row align='middle'>
                <Col span={12}>
                    <Title><FormattedMessage id='profile.title' /></Title>
                </Col>
                {
                    peekUserId
                        ? <Col span={12}>
                            <Typography.Title>
                                <FormattedMessage id='my_projects.title' />
                            </Typography.Title>
                          </Col>
                        : null
                }

            </Row>
            <Row gutter={[8, 0]} justify='space-between'>
                <Col span={12}>
                    <Skeleton active loading={loading}>
                        <ProfileCard
                            profile={GetUser?.userHttp}
                            updateHandle={UpdateStudent}
                            setActiveHandle={SetActive}
                            accessUpdate={accessUpdate}
                        />
                    </Skeleton>
                </Col>
                {
                    peekUserId ? <ProjectPagesListContainer userId={peekUserId} /> : null
                }

            </Row>
        </PageLayout>
    )
}

export default StudentProfile