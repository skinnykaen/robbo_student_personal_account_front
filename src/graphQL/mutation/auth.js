import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const authMutationsGQL = {
    SIGN_IN: gql`
        mutation SignIn($input: SignInInput!){
            SignIn(input: $input) {
                ... on SignInResponse {
                    accessToken
                }
            }
        }
    `,

    REFRESH_TOKEN: gql`
        mutation {
            Refresh{
                ... on SignInResponse {
                    accessToken
                }
            }
        }
    `,

    SIGN_OUT: gql`
        mutation{
            SignOut{
                message
            }
        }
    `,

    SIGN_UP_REQUEST: gql`
        mutation SignUpRequest($input: NewStudent!) {
            SignUpRequest(input: $input){
                ... on Error{
                    message
                }
            }
        }
    `,
}

export const authMutationsGraphQL = {
    SignIn(email, password, userRole) {
        return graphQLClient.mutate(
            {
                mutation: authMutationsGQL.SIGN_IN,
                variables: { input: { email, password, userRole } },
            },
        )
    },

    Refresh() {
        return graphQLClient.mutate(
            {
                mutation: authMutationsGQL.REFRESH_TOKEN,
            },
        )
    },

    SingOut() {
        return graphQLClient.mutate(
            {
                mutation: authMutationsGQL.SING_OUT,
            },
        )
    },
}