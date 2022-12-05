import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const projectPageMutationGQL = {
    UPDATE_PROJECT_PAGE: gql`
    mutation UpdateProjectPage($input: UpdateProjectPage!) {
        UpdateProjectPage(input: $input) {
            lastModified
        }
    }
    `,

    CREATE_PROJECT_PAGE: gql`
    mutation {
        CreateProjectPage{
            title
            linkScratch
            lastModified
            projectId
            projectPageId
        }
    }
    `,

    DELETE_PROJECT_PAGE: gql`
    mutation DeleteProjectPage($projectID: String!) {
        DeleteProjectPage(projectID: $projectID) {
            projectPageId
        }
    }
    `,
}

export const projectPageMutationGraphQL = {
    updateProjectPage(input) {
        return graphQLClient.mutate(
            {
                mutation: projectPageMutationGQL.UPDATE_PROJECT_PAGE,
                variables: input,
            },
        )
    },

    createProjectPage() {
        return graphQLClient.mutate(
            {
                mutation: projectPageMutationGQL.CREATE_PROJECT_PAGE,
                update(cache, { data: { CreateProjectPage } }) {
                    cache.modify({
                        fields: {
                            GetAllProjectPagesByAccessToken(existingProjectPages = []) {
                                return [...existingProjectPages, CreateProjectPage]
                            },
                        },
                    })
                },
            },
        )
    },

    deleteProjectPage(projectPageId) {
        return graphQLClient.mutate(
            {
                mutation: projectPageMutationGQL.DELETE_PROJECT_PAGE,
                variables: { projectID: projectPageId },
                update(cache, { data: { DeleteProjectPage } }) {
                    cache.modify({
                        fields: {
                            GetAllProjectPagesByAccessToken(existingProjectPages = []) {
                                return existingProjectPages.filter(projectPage => projectPage.projectPageId !== DeleteProjectPage.projectPageId)
                            },
                        },
                    })
                },
            },
        )
    },
}