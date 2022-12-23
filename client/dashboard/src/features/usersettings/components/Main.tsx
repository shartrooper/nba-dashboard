import * as z from 'zod';
import { Button } from "@/components/Elements/Button";
import { Form, InputField } from "@/components/Form";
import { ModalWrapper } from "@/components/Modal";
import { useState } from "react";
import useEditUser from '../hooks/useEditUser';
import { SettingMutations } from '../types';
import useFetchUserInfo from '@/features/misc/hooks/useFetchUser';


const schema = z
  .object({
    password: z.string().min(8, 'Required').max(8),
    newPassword: z.string().min(8, 'Required').max(8),
    confirmNewPassword: z.string().min(8, 'Required').max(8),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Submitted passwords don't match",
    path: ['confirmNewPassword'],
  });


const ModalContent = ({ onClose }: { onClose: () => void }) => {
  return (<div className='flex justify-evenly mt-6'>
    <Button onClick={onClose} variant='danger'>Yes</Button>
    <Button onClick={onClose} variant='primary'>No</Button>
  </div>)
}

type PasswordChangeDTOValues = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};


const SettingsContainer = () => {
  const [isOpen, toggle] = useState(false);
  const { mutationFn: updatePassword, loading } = useEditUser(SettingMutations.ChangePassword);
  const id = useFetchUserInfo('id');

  return (
    <div className="flex-col items-center">
      <p className="my-3"> Change password </p>
      <Form<PasswordChangeDTOValues, typeof schema>
        onSubmit={(dto) => {
          const { password, newPassword } = dto;
          updatePassword({ variables: { id, password, newPassword } });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="password"
              label="Old passowrd"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <InputField
              type="password"
              label="New Password"
              error={formState.errors['newPassword']}
              registration={register('newPassword')}
            />
            <InputField
              type="password"
              label="Confirm New Password"
              error={formState.errors['confirmNewPassword']}
              registration={register('confirmNewPassword')}
            />
            <div className="flex justify-center center-items">
              <Button isLoading={loading} size="sm" type="submit">
                Submit New Password
              </Button>
            </div>
          </>
        )}
      </Form>
      <p className="my-3"> Delete Account? <span className="text-red-500">(This action is irreversible!)</span></p>
      <Button onClick={() => toggle(true)} variant="danger" size="sm" >Delete Account</Button>
      <ModalWrapper header='Are you sure you want to delete your Account?' isOpen={isOpen} toggle={toggle} Body={ModalContent} />
    </div>
  )
};

export default SettingsContainer;