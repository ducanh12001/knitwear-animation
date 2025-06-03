import type { FC } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CountrySelect } from '@/components/atoms/inputs/CountrySelect';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { VALIDATION } from '@/constant/validation';
import type { PaymentForm } from '@/types';

const validationRules = {
  billing_first_name: VALIDATION.REQUIRED,
  billing_last_name: VALIDATION.REQUIRED,
  billing_country: VALIDATION.REQUIRED,
  billing_state: VALIDATION.REQUIRED,
  billing_address_1: VALIDATION.REQUIRED,
  billing_postcode: VALIDATION.REQUIRED,
  billing_city: VALIDATION.REQUIRED,
  billing_phone: {
    ...VALIDATION.REQUIRED,
    ...VALIDATION.PHONE,
  },
  billing_email: {
    ...VALIDATION.REQUIRED,
    ...VALIDATION.EMAIL,
  },
} as const;

interface BillingFormProps {
  register: UseFormRegister<PaymentForm>;
  errors: FieldErrors<PaymentForm>;
  handleFieldChange: (field: keyof PaymentForm, value: string) => void;
}

const BillingForm: FC<BillingFormProps> = ({
  register,
  errors,
  handleFieldChange,
}) => {
  return (
    <div className="woocommerce-billing-fields relative h-auto w-full">
      <h3 className="font-humane leading-full text-secondary mb-[3rem] text-[6rem] md:text-[6vw]">
        Billing details
      </h3>

      <div className="woocommerce-billing-fields__field-wrapper relative flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
        <FormInput<PaymentForm>
          name="billing_first_name"
          placeholder="First name"
          register={register}
          validation={validationRules['billing_first_name']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_last_name"
          placeholder="Last name"
          register={register}
          validation={validationRules['billing_last_name']}
          errors={errors}
          showErrors={false}
        />

        <div className="form-item z-20" id="billing_country_field">
          <CountrySelect<PaymentForm>
            name="billing_country"
            id="billing_country"
            register={register}
            validation={validationRules['billing_country']}
            errors={errors}
            onChange={(val) => {
              handleFieldChange('billing_country', val);
            }}
          />
        </div>

        <FormInput<PaymentForm>
          name="billing_state"
          placeholder="Province/Region*"
          register={register}
          validation={validationRules['billing_state']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_address_1"
          placeholder="Street address"
          register={register}
          validation={validationRules['billing_address_1']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_postcode"
          placeholder="Postcode / ZIP"
          register={register}
          validation={validationRules['billing_postcode']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_city"
          placeholder="Town / City"
          register={register}
          validation={validationRules['billing_city']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_phone"
          placeholder="Phone"
          register={register}
          validation={validationRules['billing_phone']}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="billing_email"
          type="email"
          placeholder="Email address"
          register={register}
          validation={validationRules['billing_email']}
          errors={errors}
          showErrors={false}
        />
      </div>
    </div>
  );
};

export default BillingForm;
