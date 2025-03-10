export default function AddressForm({ state, setState }) {
  return (
    <form className="flex flex-col space-y-2 pt-2 md:items-center w-full">
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="houseInfo">
          House Info
        </label>
        <input
          className="border px-2 py-1 rounded w-full"
          name="houseInfo"
          id="houseInfo"
          value={state.houseInfo}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="streetName">
          Street Name
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px] w-full"
          name="streetName"
          id="streetName"
          value={state.streetName}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="town">
          Town (optional)
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px] w-full"
          name="town"
          id="town"
          value={state.town}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="city">
          City
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px] w-full"
          name="city"
          id="city"
          value={state.city}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="county">
          County (optional)
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px]w-full"
          name="county"
          id="county"
          value={state.county}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="postcode">
          Postcode
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px] w-full"
          name="postcode"
          id="postcode"
          value={state.postcode}
          onChange={(e) => setState(e)}
        />
      </div>
      <div className="flex flex-col w-[500px]">
        <label className="text-sm text-gray-600" htmlFor="country">
          Country
        </label>
        <input
          className="border px-2 py-1 rounded w-[400px]w-full"
          name="country"
          id="country"
          value={state.country}
          onChange={(e) => setState(e)}
        />
      </div>
    </form>
  );
}
