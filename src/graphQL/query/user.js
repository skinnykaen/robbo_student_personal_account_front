import { gql } from '@apollo/client'

import { graphQLClient } from '@/graphQL'

export const usersGQL = {
    GET_STUDENT_BY_ID: gql`
    query GetStudentById($studentId: String!){
        GetStudentById(studentId: $studentId){
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
    }`,
}

export const usersQueryGraphQL = {
    getStudentById(studentId) {
        return graphQLClient.query(
            {
                query: usersGQL.GET_STUDENT_BY_ID,
                variables: studentId,
            },
        )
    },
}