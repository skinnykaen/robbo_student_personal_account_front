import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const studentQuerysGQL = {
    GET_STUDENT_BY_ID: gql`
        query GetStudentById($studentId: String!){
            GetStudentById(studentId: $studentId){
                ... on StudentHttp {
                        userHttp{
                        id
                        lastname
                        firstname
                        middlename
                        nickname
                        email
                        createdAt
                        role
                        active
                    }
                }
                ... on Error {
                    message
                }
            }
        }
    `,

    GET_ALL_STUDENTS: gql`
        query GetAllStudents($page: String!, $pageSize: String!, $active: Boolean!) {
            GetAllStudents(page: $page, pageSize: $pageSize, active: $active) {
                students{
                        userHttp{
                        id
                        lastname
                        firstname
                        middlename
                    }
                }
                countRows
            }
        }
    `,
}

export const studentQuerysGraphQL = {
    GetStudentById(studentId) {
        return graphQLClient.query(
            {
                query: studentQuerysGQL.GET_STUDENT_BY_ID,
                variables: studentId,
            },
        )
    },
}