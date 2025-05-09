import AddressFormInput from "./AddressFormInput";

export default function AddressForm({ state, setState }) {
  return (
    <form className="flex flex-col space-y-2 pt-2 items-center w-full">
      <AddressFormInput
        label="House Info"
        name="houseInfo"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="Street Name"
        name="streetName"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="Town (optional)"
        name="town"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="City"
        name="city"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="County (optional)"
        name="county"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="Postcode"
        name="postcode"
        state={state}
        setState={setState}
      />
      <AddressFormInput
        label="Country"
        name="country"
        state={state}
        setState={setState}
      />
    </form>
  );
}
