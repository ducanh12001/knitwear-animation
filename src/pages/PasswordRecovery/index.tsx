import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { VALIDATION } from '@/constant/validation';

interface PasswordRecoveryForm {
  'recovery-user': string;
}

const PasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryForm>({
    defaultValues: {
      'recovery-user': '',
    },
  });

  const onSubmit = (data: PasswordRecoveryForm) => {
    console.log('Form Data:', data);
  };

  return (
    <section className="recovery--password-section relative box-border h-auto min-h-screen w-full px-[5vw] pt-32 md:pt-[calc(10vh+10rem)]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[5vw]">
        <div className="relative h-auto w-full">
          <h1 className="font-humane text-[12vw] leading-[75%] text-[#302F35]">
            Recover your password
          </h1>
        </div>
        <form
          className="relative flex h-auto w-full flex-col items-start justify-start gap-4 md:w-7/10 md:gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput<PasswordRecoveryForm>
            name="recovery-user"
            placeholder="Username/Email address"
            register={register}
            validation={VALIDATION.REQUIRED}
            errors={errors}
          />

          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="bg-secondary relative box-border flex h-12 w-full cursor-pointer items-center justify-center rounded-[14px] px-4 transition-colors duration-350 ease-in-out md:h-[5rem] md:rounded-[25px] md:px-8"
            >
              <span className="leading-full text-base whitespace-nowrap text-white md:text-xl">
                Recover
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PasswordRecovery;
