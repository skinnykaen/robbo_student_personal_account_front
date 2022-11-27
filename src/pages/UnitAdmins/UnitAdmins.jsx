import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Select } from 'antd'

import { WelcomeText } from "./components"

import PageLayout from '@/components/PageLayout'
import SideBar from "@/components/SideBar"
import { DragResize, Button } from '@/components/UI'
import ListItem from '@/components/ListItem'
import Flex from '@/components/Flex'
import AddUnitAdmin from "@/components/AddUnitAdmin"

import { getUnitAdminsState } from "@/reducers/unitAdmins"
import Loader from "@/components/Loader"
import { useUserIdentity, checkAccess } from "@/helpers"
import { useActions } from "@/helpers/useActions"
import UnitAdminContent from "@/components/UnitAdminContent"
import { SUPER_ADMIN, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/constants"

export default () => {
    const { userRole, isAuth, loginLoading } = useUserIdentity()

    const token = localStorage.getItem('token')
    const [openAddUnitAdmin, setOpenAddUnitAdmin] = useState(false)
    const { loading, unitAdmins } = useSelector(({ unitAdmins }) => getUnitAdminsState(unitAdmins))
    const { deleteUnitAdmin, getUnitAdmins } = useActions()

    useEffect(() => {
        if (!loginLoading && checkAccess(userRole, [SUPER_ADMIN]))
            getUnitAdmins(token)
        return () => {
            // clearTeachersState
        }
    }, [loginLoading])

    if (!loginLoading && !checkAccess(userRole, [SUPER_ADMIN])) {
        return <Redirect to={HOME_PAGE_ROUTE} />
    } else if (!isAuth && !loginLoading) {
        return <Redirect to={LOGIN_PAGE_ROUTE} />
    }

    const [sortValue, setSort] = useState('sortBy')
    const handleChange = sortValue => {
        switch (sortValue) {
            case 'alphabet':
                unitAdmins.sort((a, b) => a.userHttp.lastname > b.userHttp.lastname ? 1 : -1)
                break
            default:
                unitAdmins.sort((a, b) => a.userHttp.id > b.userHttp.id ? 1 : -1)
                break
        }
    }

    return (
        <PageLayout>
            <WelcomeText>Unit Админы</WelcomeText>
            <DragResize
                open={openAddUnitAdmin} setOpen={setOpenAddUnitAdmin}
                // refactor to modal
                content={() => (
                    <AddUnitAdmin />
                )}
            />
            <Flex direction='column' justify='flex-end'
                align='flex-start'>
                <Button
                    background='green'
                    content='Добавить Unit Админа'
                    padding='0.5rem'
                    margin='0.5rem'
                    handleSubmit={() => { setOpenAddUnitAdmin(true) }}
                />
                <Select
                    style={{ width: 180, margin: '0.5rem' }}
                    defaultValue='Сортировка'
                    onChange={setSort}
                    options={[
                        {
                            value: 'alphabet',
                            label: 'По алфавиту',
                        },
                        {
                            value: 'sortBy',
                            label: 'Сортировка',
                        },
                    ]}
                />
            </Flex>
            {
                loading ? <Loader />
                    : (
                        <Flex
                            widht='100%' direction='column'
                            justify=' center'
                        >
                            <Flex direction='column'>
                                {handleChange(sortValue)}
                                {
                                    unitAdmins?.map((unitAdmin, index) => {
                                        return (
                                            <ListItem
                                                itemIndex={index}
                                                key={index}
                                                label={`
                                                        ${unitAdmin.userHttp.lastname}
                                                        ${unitAdmin.userHttp.firstname}
                                                        ${unitAdmin.userHttp.middlename}
                                                    `}
                                                handleDelete={unitAdminIndex => deleteUnitAdmin(token, unitAdmin.userHttp.id, unitAdminIndex)}
                                                render={(open, setOpen) => (
                                                    <DragResize
                                                        open={open} setOpen={setOpen}
                                                        width='65%' height='80%'
                                                        content={() => (
                                                            // refactor useQuery
                                                            <UnitAdminContent unitAdmin={unitAdmin.userHttp} />
                                                        )}
                                                    />
                                                )}
                                            />
                                        )
                                    })
                                }
                            </Flex>
                        </Flex>
                    )
            }
        </PageLayout>
    )
}