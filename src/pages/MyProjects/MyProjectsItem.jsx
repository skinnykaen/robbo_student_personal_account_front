import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { ProjectPageItem, ScratchLink, LastModified, RemoveProjectPage } from './components'

import config from '@/config'
import { useActions } from '@/helpers'
import Flex from '@/components/Flex'
import { deleteProjectPage } from '@/actions'

const { confirm } = Modal

export default ({ projectPageIndex, projectPage }) => {

    const action = useActions({ deleteProjectPage }, [])
    const history = useNavigate()

    const toProjectPageHandler = () => {
        history(`/projects/${projectPage.projectPageId}`)
    }

    const seeInsideHandler = () => {
        window.location.replace(config.scratchURL + `?#${projectPage.projectId}`)
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Вы точно хотите удалить?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk() {
                action.deleteProjectPage(projectPage.projectPageId, projectPageIndex)
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    return (
        <ProjectPageItem>
            <Space direction='vertical'>
                <ScratchLink onClick={toProjectPageHandler}> {projectPage.title}</ScratchLink>
                <LastModified>
                    {'Последние изменение: ' + projectPage.lastModified}
                </LastModified>
                <Button type='primary' onClick={seeInsideHandler}>
                    Перейти
                </Button>
            </Space>
            <Flex width='58%' justify='flex-end'
                align='center'>
                <RemoveProjectPage onClick={showDeleteConfirm}>
                    удалить
                </RemoveProjectPage>
            </Flex>
        </ProjectPageItem>
    )
}