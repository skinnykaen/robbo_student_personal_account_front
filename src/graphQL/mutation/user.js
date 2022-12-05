import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const userMutationGQL = {
    UPDATE_STUDENT: gql`
    mutation UpdateStudent($input: UpdateStudentInput!) {
        UpdateStudent(input: $input){
            userHttp{
                email
                nickname
                lastname
                firstname
                middlename
            }
        }
    }
    `,
}

export const userMutationGraphQL = {
    updateProfile(input, role) {
        let gql = null
        switch (role) {
            case 0:
                gql = userMutationGQL.UPDATE_STUDENT
                break
            default:
                break
        }
        return graphQLClient.mutate(
            {
                mutation: gql,
                variables: input,
                update(cache, { data: { UpdateStudent } }) {
                    cache.modify({
                        fields: {
                            GetStudentByAccessToken(existingStudent = {}) {
                                return { ...existingStudent, ...existingStudent.userHttp }
                            },
                        },
                    })
                },
            },
        )
    },
}