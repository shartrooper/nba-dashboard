import { ApolloError } from "@apollo/client";

type ErrorResponse = {
    message: string
    statusCode: number
}

export const handleError = (error: ApolloError) => {
    const gqlErrors = error.graphQLErrors;
    return gqlErrors.map(errorItem => {
        const errorContent = errorItem.extensions;
        if (errorContent.response) {
            const { statusCode, message } = errorItem.extensions.response as ErrorResponse;
            return { statusCode, message }
        }
        return { statusCode: errorContent.code, message: 'Please contact the dev team.' }
    })
}