import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Space } from 'antd'

import { ProjectPageItem, ScratchLink, LastModified, RemoveProjectPage } from './components'

import config from '@/config'
import { useActions } from '@/helpers'
import Flex from '@/components/Flex'
import { deleteProjectPage } from '@/actions'

export default ({ projectPageIndex, projectPage }) => {

    const action = useActions({ deleteProjectPage }, [])
    const history = useHistory()

    const toProjectPageHandler = () => {
        history.push(`/projects/${projectPage.projectPageId}`)
    }

    const seeInsideHandler = () => {
        window.location.replace(config.scratchURL + `?#${projectPage.projectId}`)
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
                <RemoveProjectPage onClick={() => action.deleteProjectPage(projectPage.projectPageId, projectPageIndex)}>
                    удалить
                </RemoveProjectPage>
            </Flex>
        </ProjectPageItem>
    )
}