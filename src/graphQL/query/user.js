import { gql } from '@apollo/client'

import { graphQLClient } from '@/graphQL'

export const usersGQL = {
    GET_STUDENT_BY_ID: gql`
    query GetStudentById($studentId: String!){
        GetStudentById(studentId: $studentId){
            ... on StudentHttp{
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
            ... on Error{
                message
            }
        }
    }`,

    GET_STUDENT_BY_ACCESS_TOKEN: gql`
    query GetStudentByAccessToken{
        GetStudentByAccessToken{
            ... on StudentHttp{
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
            ... on Error{
                message
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

    getStudentByAccessToken() {
        return graphQLClient.query(
            {
                query: usersGQL.GET_STUDENT_BY_ACCESS_TOKEN,
            },
        )
    },
}