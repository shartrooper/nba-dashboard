import { UserInput } from '../../src/auth/dto';
import { queryTemplate, graphqlReq } from '../utils';

export function authSpecs() {
  describe('Auth', () => {
    const mutationTemplate = queryTemplate('mutation');
    const dto: UserInput = {
      username: 'newTestUser',
      password: 'mockpassword',
    };

    describe('SignUp', () => {
      const signUpUserTemplate = mutationTemplate(
        'SignUp',
        ['$createUserInput: UserInput!'],
        ['signUp(createUserInput: $createUserInput){ access_token}'],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(signUpUserTemplate)
          .withGraphQLVariables({ createUserInput: dto })
          .expectStatus(200));
      it('should throw errorcode if password is empty', () =>
        graphqlReq
          .withGraphQLQuery(signUpUserTemplate)
          .withGraphQLVariables({ createUserInput: { username: dto.username } })
          .expectStatus(400));
      it('should throw errorcode if no body provided', () =>
        graphqlReq.withGraphQLQuery(signUpUserTemplate).expectStatus(400));
    });

    describe('SignIn', () => {
      const signInUserTemplate = mutationTemplate(
        'SignIn',
        ['$userInput: UserInput!'],
        [`signIn(userInput: $userInput){ access_token}`],
      );

      it('should return status 200', () =>
        graphqlReq
          .withGraphQLQuery(signInUserTemplate)
          .withGraphQLVariables({ userInput: dto })
          .expectStatus(200));
      it('should throw errorcode if password is empty', () =>
        graphqlReq
          .withGraphQLQuery(signInUserTemplate)
          .withGraphQLVariables({ userInput: { username: dto.username } })
          .expectStatus(400));
      it('should throw errorcode if no body provided', () =>
        graphqlReq.withGraphQLQuery(signInUserTemplate).expectStatus(400));
    });
  });
}
