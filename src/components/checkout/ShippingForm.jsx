import { CountrySelect } from "../atoms/inputs/CountrySelect";
import { FormInput } from "../atoms/inputs/FormInput";

export default function ShippingForm({ register, errors, handleFieldChange }) {
  return (
    <div className="shipping_address">
      <div className="woocommerce-billing-fields__field-wrapper relative mb-[3rem] flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
        <FormInput
          name="shipping_first_name"
          placeholder="First name"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="shipping_last_name"
          placeholder="Last name"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />

        <div className="form-item z-20" id="shipping_country_field">
          <CountrySelect
            name="shipping_country"
            id="shipping_country"
            register={register}
            validation={{
              required: "Please select a country",
            }}
            errors={errors}
            onChange={(val) => {
              handleFieldChange("shipping_country", val);
            }}
          />
        </div>

        <FormInput
          name="shipping_state"
          placeholder="Province/Region*"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="shipping_address_1"
          placeholder="Street address"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="shipping_postcode"
          placeholder="Postcode / ZIP"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />

        <FormInput
          name="shipping_city"
          placeholder="Town / City"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
          showErrors={false}
        />
      </div>
    </div>
  );
}
