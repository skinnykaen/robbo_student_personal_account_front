import React from "react"
import { useNavigate } from "react-router-dom"
import { List } from "antd"

import { PROFILE_PAGE_ROUTE } from "@/constants"
import ListItem from "@/components/ListItem"

const StudentsTab = ({
    GetAllStudents,
    onChangePage,
    currentPage,
    pageSize,
    DeleteStudent,
}) => {
    const navigate = useNavigate()
    const openProfileStudent = userId => {
        navigate(PROFILE_PAGE_ROUTE, {
            state: {
                userId,
                userRole: 0,
            },
        })
    }

    return (
        <List
            className='studentsList'
            loading={GetAllStudents?.loading}
            bordered
            size='large'
            dataSource={GetAllStudents?.GetAllStudents?.students}
            pagination={{
                onChange: onChangePage,
                total: GetAllStudents?.GetAllStudents?.countRows,
                current: +currentPage,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={({ userHttp }, index) => (
                <ListItem
                    itemIndex={index}
                    handleDelete={() => DeleteStudent({
                        variables: {
                            studentId: userHttp.id,
                        },
                    })}
                    label={`${userHttp.lastname} ${userHttp.firstname} ${userHttp.middlename}`}
                    handleClick={() => openProfileStudent(userHttp.id)}
                    key={index}
                    render={() => { }}
                />
            )}
        />
    )
}

export default StudentsTab