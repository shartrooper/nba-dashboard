import { ApolloError } from "@apollo/client";

type ErrorResponse = {
    message: string
    statusCode: number
}

export const handleError = (error: ApolloError): ErrorResponse[] => {
    const gqlErrors = error.graphQLErrors;
    return gqlErrors.map(errorItem => {
        const { statusCode, message } = errorItem.extensions.response as ErrorResponse;
        return { statusCode, message }
    })
}