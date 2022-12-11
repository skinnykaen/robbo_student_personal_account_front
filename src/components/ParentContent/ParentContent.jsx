import React from "react"
import { gql, useQuery } from "@apollo/client"
import { Tabs } from 'antd'

import ChildrenTab from "./ChildrenTab"

import Flex from "@/components/Flex"
import { useActions } from "@/helpers/useActions"
import Loader from "@/components/Loader"
import ProfileCard from "@/components/ProfileCard"
import { updateProfile } from '@/actions'

const GET_PARENT_BY_ID = gql`
query GetParentById($parentId: String!){
    GetParentById(parentId: $parentId) {
        userHttp{
            id
            lastname
            firstname
            middlename
            nickname
            email
            createdAt
            role
        }
    }
}
`

export default ({ clientId }) => {
    const actions = useActions({ updateProfile }, [])

    const { loading, data } = useQuery(GET_PARENT_BY_ID, {
        variables: { parentId: clientId },
    })

    return (

        <Flex direction='column' width='100%'>
            <Flex padding='0 1rem' direction='column'>
                <Flex direction='column' align='center'
                    width='100%'
                >
                    Карточка родителя
                    <Tabs
                        defaultActiveKey='1'
                        items={[
                            {
                                label: 'Профиль',
                                key: '1',
                                children: loading
                                    ? <Loader />
                                    : <ProfileCard updateHandle={actions.updateProfile} profile={data.GetParentById?.userHttp} />,
                            },
                            {
                                label: 'Дети',
                                key: '2',
                                children: <ChildrenTab clientId={clientId} />,
                            },
                        ]}
                    />
                </Flex>
            </Flex>
        </Flex >
    )
} 