import React, { useState } from 'react'
import { Button, Row, Col, Typography, Modal, Tabs } from 'antd'
import { FormattedMessage } from 'react-intl'

import StudentsTab from './StudentsTab'

import PageLayout from '@/components/PageLayout'
import AddStudent from '@/components/AddStudent'

const { Title } = Typography

const Students = ({
    intl,
    GetAllStudents,
    GetAllNotActiveStudents,
    DeleteStudent,
    pageSize,
    currentPage,
    onChangePage,
}) => {
    const [openAddStudent, setOpenAddStudent] = useState(false)
    return (
        <PageLayout>
            <Row style={{ margin: '0.5rem' }}>
                <Col span={24}>
                    <Title>
                        <FormattedMessage id='students.title' />
                    </Title>
                </Col>
                <Col span={24}>
                    <Button type='primary' onClick={() => setOpenAddStudent(true)}>
                        <FormattedMessage id='students.create_new' />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey='1'
                        items={[
                            {
                                label: <FormattedMessage id='students.active_students' />,
                                key: '1',
                                children:
                                    <StudentsTab
                                        GetAllStudents={GetAllStudents}
                                        DeleteStudent={DeleteStudent}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onChangePage={onChangePage}
                                    />,
                            },
                            {
                                label: <FormattedMessage id='students.not_active_students' />,
                                key: '2',
                                children:
                                    <StudentsTab
                                        GetAllStudents={GetAllNotActiveStudents}
                                        DeleteStudent={DeleteStudent}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onChangePage={onChangePage}
                                    />,
                            },
                        ]}
                    />
                </Col>
            </Row>
            <Modal
                title={<FormattedMessage id='students.add_student_title' />}
                centered
                open={openAddStudent}
                onCancel={() => setOpenAddStudent(false)}
                footer={[]}
            >
                <AddStudent />
            </Modal>
        </PageLayout >
    )
}

export default Students