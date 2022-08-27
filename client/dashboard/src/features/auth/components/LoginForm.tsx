import * as z from 'zod';
import {Form, InputField} from '@/components/Form'
import { Button } from '@/components/Elements/Button'
import { signInGQLQuery } from '../api';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  console.log(signInGQLQuery);
  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          // await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Username"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div className="flex justify-center center-items">
              <Button isLoading={false} type="submit">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};