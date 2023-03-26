import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Input, Button, Form, Switch, Spin, Row, Col } from 'antd'

import { getProjectPageById, clearProjectPageState, updateProjectPage } from '@/actions'
import PageLayout from '@/components/PageLayout'

import config from '@/config'
import { useActions } from '@/helpers'

import { getProjectPageState } from '@/reducers/projectPage'

const { TextArea } = Input

const ProjectPage = () => {
    const actions = useActions({
        getProjectPageById,
        clearProjectPageState,
        updateProjectPage,
    }, [])

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    }
    const [form] = Form.useForm()
    const { projectPageId } = useParams()

    useEffect(() => {
        actions.getProjectPageById(projectPageId)
        return () => {
            actions.clearProjectPageState()
        }
    }, [])

    const { projectPage, loading } = useSelector(({ projectPage }) => getProjectPageState(projectPage))

    const seeInsideHandler = () => {
        window.open(config.scratchURL + `?#${projectPageId}`)
    }

    return (
        <PageLayout>
            {loading ? <Spin />
                : (
                    <Row align='start'>
                        <Col span={12}>
                            <Form
                                name='normal_project-page'
                                className='project-page-form'
                                labelWrap
                                {...layout}
                                form={form}
                                initialValues={{
                                    title: projectPage.title,
                                    instruction: projectPage.instruction,
                                    notes: projectPage.notes,
                                }}
                                onFinish={({ title, instruction, notes }) => {
                                    actions.updateProjectPage({
                                        projectPageId: projectPageId,
                                        projectId: projectPage.projectId,
                                        title: title,
                                        instruction: instruction,
                                        notes: notes,
                                        isShared: projectPage.isShared,
                                    })
                                }}
                            >
                                <Form.Item
                                    name='title'
                                    placeholder={projectPage.title}
                                    label={<FormattedMessage id='project_page.title' />}
                                >
                                    <Input size='large' />
                                </Form.Item>
                                <Form.Item
                                    name='instruction' placeholder={projectPage.title}
                                    label={<FormattedMessage id='project_page.instruction' />}
                                >
                                    <TextArea size='large' rows={4} />
                                </Form.Item>
                                <Form.Item
                                    name='notes' placeholder={projectPage.title}
                                    label={<FormattedMessage id='project_page.description' />}
                                >
                                    <TextArea size='large' rows={4} />
                                </Form.Item>
                                <Form.Item
                                    label={<FormattedMessage id='project_page.last_change' />}
                                >
                                    {projectPage.lastModified}
                                </Form.Item>
                                {
                                    projectPage.isShared
                                        ? (
                                            <Form.Item
                                                name='isShared'
                                                label={<FormattedMessage id='project_page.close_access' />}
                                                valuePropName='checked'
                                            >
                                                <Switch defaultChecked onChange={() => { }} />
                                            </Form.Item>
                                        )
                                        : (
                                            <Form.Item
                                                name='isShared'
                                                label={<FormattedMessage id='project_page.open_access' />}
                                                valuePropName='checked'
                                            >
                                                <Switch onChange={() => { }} />
                                            </Form.Item>
                                        )
                                }
                                <Form.Item >
                                    <Button
                                        type='primary' htmlType='submit'
                                        className='login-form-button'
                                    >
                                        <FormattedMessage id='project_page.save' />
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Button
                                type='primary' onClick={seeInsideHandler}
                            >
                                <FormattedMessage id='project_page.open_in_scratch' />
                            </Button>
                        </Col>
                    </Row>
                )
            }
        </PageLayout >
    )
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

export default ProjectPage