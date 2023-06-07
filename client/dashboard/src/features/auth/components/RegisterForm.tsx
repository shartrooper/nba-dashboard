import * as z from 'zod';
import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements/Button';
import useAuth from '../hook/useAuth';

const schema = z
  .object({
    username: z.string().min(4, 'Required'),
    password: z.string().min(8, 'Required').max(8),
    confirm: z.string().min(8, 'Required').max(8),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Submitted passwords don't match",
    path: ['confirm'],
  });

type RegistrationValues = {
  username: string;
  password: string;
  confirm: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: LoginFormProps) => {
  const { mutationFn: register, loading } = useAuth('signUp');

  return (
    <div>
      <Form<RegistrationValues, typeof schema>
        onSubmit={(dto) => {
          const { username, password } = dto;
          register({ variables: { createUserInput: { username, password } } });
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
            <InputField
              type="password"
              label="Confirm Password"
              error={formState.errors['confirm']}
              registration={register('confirm')}
            />
            <div className="flex justify-center center-items">
              <Button isLoading={loading} type="submit">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
