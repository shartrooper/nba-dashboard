export type UserInput = {
    username: string;
    password: string;
}

// Type annotations for graphql queries
export enum AuthMutations {
    SignIn = 'signIn',
    SignUp = 'signUp'
}

export enum AuthQueryFields {
    AccessToken = 'access_token'
}

export const authBodyParams = {
    [AuthMutations.SignIn]: ['$userInput: UserInput!'],
    [AuthMutations.SignUp]: ['$createUserInput: UserInput!']
}

export type AuthQueriesResponse = {
    [key: string]: { [AuthQueryFields.AccessToken]: string}
}