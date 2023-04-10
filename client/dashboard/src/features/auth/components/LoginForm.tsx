import * as z from 'zod';
import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements/Button';
import useAuth from '../hook/useAuth';

const schema = z.object({
  username: z.string().min(4, 'Required username equal or longer than 4 characters'),
  password: z.string().max(8, 'Required password equal or shorter than 8 characters'),
});

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { mutationFn: login, loading } = useAuth('signIn');

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
              <Button isLoading={loading} type="submit">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
