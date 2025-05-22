import { CountrySelect } from "../atoms/inputs/CountrySelect";
import { FormInput } from "../atoms/inputs/FormInput";

export default function BillingForm({ register, errors, handleFieldChange }) {
  return (
    <div className="woocommerce-billing-fields relative h-auto w-full">
      <h3 className="font-humane leading-full mb-[3rem] text-[6rem] text-[#FD7453] md:text-[6vw]">
        Billing details
      </h3>

      <div className="woocommerce-billing-fields__field-wrapper relative flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
        <FormInput
          name="billing_first_name"
          placeholder="First name"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_last_name"
          placeholder="Last name"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <div className="form-item z-20" id="billing_country_field">
          <CountrySelect
            name="billing_country"
            id="billing_country"
            register={register}
            validation={{ required: "Please select a country" }}
            errors={errors}
            onChange={(val) => {
              handleFieldChange("billing_country", val);
            }}
          />
        </div>

        <FormInput
          name="billing_state"
          placeholder="Province/Region*"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_address_1"
          placeholder="Street address"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_postcode"
          placeholder="Postcode / ZIP"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_city"
          placeholder="Town / City"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_phone"
          placeholder="Phone"
          register={register}
          validation={{ required: "The field cannot be empty" }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="billing_email"
          type="email"
          placeholder="Email address"
          register={register}
          validation={{
            required: "The field cannot be empty",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors}
          showErrors={false}
        />
      </div>
    </div>
  );
}
