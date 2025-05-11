import AddressFormInput from "./AddressFormInput";

const addressFields = [
  { label: "House Info", name: "houseInfo" },
  { label: "Street Name", name: "streetName" },
  { label: "Town (optional)", name: "town" },
  { label: "City", name: "city" },
  { label: "County (optional)", name: "county" },
  { label: "Postcode", name: "postcode" },
  { label: "Country", name: "country" },
];

export default function AddressForm({ state, setState }) {
  return (
    <form className="flex flex-col space-y-2 pt-2 items-center w-full">
      {addressFields.map(({ label, name }) => (
        <AddressFormInput
          key={name}
          label={label}
          name={name}
          state={state}
          setState={setState}
        />
      ))}
    </form>
  );
}
s;
