import * as z from 'zod';
import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/Elements/Button'
import useAuth from '../hooks/useAuth';

const schema = z.object({
  username: z.string().min(4, 'Required'),
  password: z.string().min(8, 'Required'),
});

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { mutationFn: login } = useAuth('signIn')

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={(dto) => login({ variables: { userInput: { ...dto } } })}
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