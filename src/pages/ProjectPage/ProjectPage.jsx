import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import { Input, Button, Form, Switch, notification } from 'antd'

import { getProjectPageById, clearProjectPageState, updateProjectPage } from '@/actions'
import { checkAccess, useUserIdentity, useActions, openNotificationWithIcon } from '@/helpers'
import { STUDENT, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '@/constants'
import { getProjectPagesState } from '@/reducers/myProjects'
import PageLayout from '@/components/PageLayout'
import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import config from '@/config'

const { TextArea } = Input

export default () => {
    const { userRole, isAuth, loginLoading } = useUserIdentity()
    const [form] = Form.useForm()
    const { projectPageId } = useParams()

    const actions = useActions({
        getProjectPageById,
        clearProjectPageState,
        updateProjectPage,
    }, [])

    useEffect(() => {
        if (!loginLoading && checkAccess(userRole, [STUDENT]))
            actions.getProjectPageById(projectPageId)
        return () => actions.clearProjectPageState()
    }, [loginLoading])

    const { projectPage, loading, err } = useSelector(({ projectPage }) => getProjectPagesState(projectPage))



    if (!loginLoading && !checkAccess(userRole, [STUDENT])) {
        return <Redirect to={HOME_PAGE_ROUTE} />
    } else if (!isAuth && !loginLoading) {
        return <Redirect to={LOGIN_PAGE_ROUTE} />
    }

    const seeInsideHandler = () => { window.location.replace(config.scratchURL + `?#${projectPageId}`) }
    const [api, contextHolder] = notification.useNotification()

    if (err) {
        // openNotificationWithIcon('error', 'Ошибка!', '', api)
        console.log(err)
    }

    return (
        <PageLayout>
            {contextHolder}
            {loading || loginLoading
                ? <Loader />
                : (
                    <Flex direction='column' align='flex-start'
                        width='100%' height='100%'
                        padding='2rem'>
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
                                openNotificationWithIcon('success', 'Успешно обновлено', '', api)
                            }}
                        >
                            <Form.Item
                                name='title' placeholder={projectPage.title}
                                label='Название'
                            >
                                <Input size='large' />
                            </Form.Item>
                            <Form.Item
                                name='instruction' placeholder={projectPage.title}
                                label='Инструкция'
                            >
                                <TextArea size='large' rows={4} />
                            </Form.Item>
                            <Form.Item
                                name='notes' placeholder={projectPage.title}
                                label='Примечание'
                            >
                                <TextArea size='large' rows={4} />
                            </Form.Item>
                            <Form.Item label='Последнее обновление'>
                                {projectPage.lastModified}
                            </Form.Item>
                            {
                                projectPage.isShared
                                    ? (
                                        <Form.Item
                                            name='isShared' label='Закрыть доступ'
                                            valuePropName='checked'
                                        >
                                            <Switch defaultChecked onChange={() => { }} />
                                        </Form.Item>
                                    )
                                    : (
                                        <Form.Item
                                            name='isShared' label='Открыть доступ'
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
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                        <Button
                            type='primary' onClick={seeInsideHandler}
                        >
                            Открыть в Robbo Scratch
                        </Button>

                    </Flex>
                )
            }
        </PageLayout>
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