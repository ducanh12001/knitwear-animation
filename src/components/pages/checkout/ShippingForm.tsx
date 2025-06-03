import type { FC } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CountrySelect } from '@/components/atoms/inputs/CountrySelect';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { VALIDATION } from '@/constant/validation';
import type { PaymentForm } from '@/types';

const validationRules = {
  shipping_first_name: VALIDATION.REQUIRED,
  shipping_last_name: VALIDATION.REQUIRED,
  shipping_country: VALIDATION.REQUIRED,
  shipping_state: VALIDATION.REQUIRED,
  shipping_address_1: VALIDATION.REQUIRED,
  shipping_postcode: VALIDATION.REQUIRED,
  shipping_city: VALIDATION.REQUIRED,
} as const;

interface ShippingFormProps {
  register: UseFormRegister<PaymentForm>;
  errors: FieldErrors<PaymentForm>;
  handleFieldChange: (field: keyof PaymentForm, value: string) => void;
}

const ShippingForm: FC<ShippingFormProps> = ({
  register,
  errors,
  handleFieldChange,
}) => {
  return (
    <div className="shipping_address">
      <div className="woocommerce-billing-fields__field-wrapper relative mb-[3rem] flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
        <FormInput<PaymentForm>
          name="shipping_first_name"
          placeholder="First name"
          register={register}
          validation={validationRules.shipping_first_name}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="shipping_last_name"
          placeholder="Last name"
          register={register}
          validation={validationRules.shipping_last_name}
          errors={errors}
          showErrors={false}
        />

        <div className="form-item z-20" id="shipping_country_field">
          <CountrySelect<PaymentForm>
            name="shipping_country"
            id="shipping_country"
            register={register}
            validation={validationRules.shipping_country}
            errors={errors}
            onChange={(val) => {
              handleFieldChange('shipping_country', val);
            }}
          />
        </div>

        <FormInput<PaymentForm>
          name="shipping_state"
          placeholder="Province/Region*"
          register={register}
          validation={validationRules.shipping_state}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="shipping_address_1"
          placeholder="Street address"
          register={register}
          validation={validationRules.shipping_address_1}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="shipping_postcode"
          placeholder="Postcode / ZIP"
          register={register}
          validation={validationRules.shipping_postcode}
          errors={errors}
          showErrors={false}
        />

        <FormInput<PaymentForm>
          name="shipping_city"
          placeholder="Town / City"
          register={register}
          validation={validationRules.shipping_city}
          errors={errors}
          showErrors={false}
        />
      </div>
    </div>
  );
};

export default ShippingForm;
