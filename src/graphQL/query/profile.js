import { gql } from "@apollo/client"

export const profileGQL = {
    GET_USER: gql`
        query GetUser($peekUserId: String, $peekUserRole: Int) {
            GetUser(peekUserId: $peekUserId, peekUserRole: $peekUserRole) {
                __typename
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
                        active
                    }
                    robboGroupId
                    robboUnitId
                }
            }
        }
    `,
}