import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const studentMutationsGQL = {
    CREATE_STUDENT: gql`
    mutation CreateStudent($input: NewStudent!) {
        CreateStudent(input: $input) {
        __typename
        ... on StudentHttp{
            userHttp{
                firstname
                lastname
                middlename
                id
            }
        }
        ... on Error{
            message
        }
    }
    }
    `,

    UPDATE_STUDENT: gql`
    mutation UpdateStudent($input: UpdateProfileInput!) {
        UpdateStudent(input: $input) {
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
            }
            }

            ... on Error {
                message
            }
        }
    }
    `,

    DELETE_STUDENT: gql`
    mutation DeleteStudent($studentId: String!) {
        DeleteStudent(studentId: $studentId) {
            ... on DeletedStudent{
                    studentId
                }
        }
    }
    `,
}

export const studentMutationsGraphQL = {
    CreateStudent(input) {
        return graphQLClient.mutate(
            {
                mutation: studentMutationsGQL.CREATE_STUDENT,
                variables: input,
            },
        )
    },

    UpdateStudent(input) {
        return graphQLClient.mutate(
            {
                mutation: studentMutationsGQL.UPDATE_STUDENT,
                variables: input,
            },
        )
    },

    DeleteStudent(studentId) {
        return graphQLClient.mutate(
            {
                mutation: studentMutationsGQL.DELETE_STUDENT,
                variables: studentId,
            },
        )
    },
}