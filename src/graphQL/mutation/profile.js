import {
    graphQLClient,
    studentMutationsGQL,
} from "@/graphQL"
import {
    STUDENT,
} from "@/constants"

export const profileMutationsGQL = {

}

export const profileMutationsGraphQL = {
    UpdateProfile(input, role) {
        const update = {}
        const refetchQueries = null
        let gqlString = null
        switch (role) {
            case STUDENT:
                gqlString = studentMutationsGQL.UPDATE_STUDENT
                break

            default:
                break
        }
        return graphQLClient.mutate(
            {
                mutation: gqlString,
                variables: input,
                ...update,
                refetchQueries: refetchQueries,
            },
        )
    },
}
