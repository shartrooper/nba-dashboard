export type UserInput = {
    username: string;
    password: string;
}

// Type annotations for graphql queries
export enum AuthMutations {
    SignIn = 'signIn'
}

export enum AuthQueryFields {
    AccessToken ='access_token'
}

export const authBodyParams = {
    [AuthMutations.SignIn]: ['$userInput: UserInput!']
}