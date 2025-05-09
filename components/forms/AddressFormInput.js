import React from "react";

export default function AddressFormInput({ label, name, state, setState }) {
  return (
    <div className="flex flex-col max-w-[500px] w-full">
      <label className="text-sm text-gray-600" htmlFor={name}>
        {label}
      </label>
      <input
        className="border px-2 py-1 rounded w-full"
        name={name}
        id={name}
        value={state[name]}
        onChange={(e) =>
          setState((prevState) => ({ ...prevState, [name]: e.target.value }))
        }
      />
    </div>
  );
}
