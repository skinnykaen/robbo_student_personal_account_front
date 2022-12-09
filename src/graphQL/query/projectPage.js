import { gql } from '@apollo/client'

import { graphQLClient } from '@/graphQL'

export const projectPageQueryGQL = {
    GET_PROJECT_PAGES_BY_ACCESS_TOKEN: gql`
        query {
            GetAllProjectPagesByAccessToken { 
                __typename
                ... on ProjectPageHttpList {
                    projectPages{
                        title
                        linkScratch
                        projectPageId
                        projectId
                        lastModified
                    }
                }
                ... on Error {
                    message
                }
            }
        }
    `,

    GET_PROJECT_PAGE_BY_ID: gql`
        query GetProjectPageById($projectPageID: String!){
            GetProjectPageById(projectPageID: $projectPageID){
                __typename
                ... on ProjectPageHttp {
                    projectPageId
                    lastModified
                    projectId
                    instruction
                    notes
                    preview
                    linkScratch
                    title
                    isShared
                }
                ... on Error {
                    message
                }
            }
        }
    `,
}

export const projectPageQueryGraphQL = {
    getProjectPagesByAccessToken() {
        return graphQLClient.query(
            {
                query: projectPageQueryGQL.GET_PROJECT_PAGES_BY_ACCESS_TOKEN,
            },
        )
    },

    getProjectPageById(projectPageID) {
        return graphQLClient.query(
            {
                query: projectPageQueryGQL.GET_PROJECT_PAGE_BY_ID,
                variables: projectPageID,
            },
        )
    },
}