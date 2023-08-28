import React, { useEffect, useRef } from "react"
import { ActionKind } from "./FreeGiftForm"
import searchWithPlaces from "../../helpers/searchWithPlaces"

const AUTOCOMPLETE_OPTIONS = {
  fields: ["address_components"],
  strictBounds: false,
  types: ["address"],
}

function Address({ formState, dispatch }) {
  const autocompleteRef = useRef(null)

  const handleAddressChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    dispatch({
      type: ActionKind.ADDRESS_INPUT,
      payload: e.target.value,
    })
  }

  useEffect(() => {
    if (!autocompleteRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current,
      AUTOCOMPLETE_OPTIONS,
    )

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()

      const address = place?.address_components?.find(component => {
        return component.types.includes("route")
      })?.long_name
      const street_number = place?.address_components?.find(component => {
        return component.types.includes("street_number")
      })?.long_name
      const zip_code = place?.address_components?.find(component => {
        return component.types.includes("postal_code")
      })?.long_name
      const city = place?.address_components?.find(component => {
        return component.types.includes("locality")
      })?.long_name
      const state = place?.address_components?.find(component => {
        return component.types.includes("administrative_area_level_1")
      })?.long_name
      const country = place?.address_components?.find(component => {
        return component.types.includes("country")
      })?.long_name

      if (!address) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error: "Please enter a valid address.",
          },
        })
      }
      if (!street_number) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error: "Please select an address with a street number.",
          },
        })
      }
      if (!zip_code) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error:
              "We could not find a zip code for the selected address. Please try again.",
          },
        })
      }
      if (!city) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error:
              "We could not find a city for the selected address. Please try again.",
          },
        })
      }
      if (!state) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error:
              "We could not find a state for the selected address. Please try again.",
          },
        })
      }
      if (!country) {
        return dispatch({
          type: ActionKind.SET_FORM_CONTENT,
          payload: {
            key: "address",
            value: "",
            error:
              "We could not find a country for the selected address. Please try again.",
          },
        })
      }

      dispatch({
        type: ActionKind.PLACE_SELECTED,
        payload: place,
      })
      dispatch({
        type: ActionKind.ADDRESS_INPUT,
        payload: `${address} ${street_number}`,
      })
      dispatch({
        type: ActionKind.SET_FORM_CONTENT,
        payload: {
          key: "zip_code",
          value: zip_code,
          error: "",
        },
      })
      dispatch({
        type: ActionKind.SET_FORM_CONTENT,
        payload: {
          key: "city",
          value: city,
          error: "",
        },
      })
      dispatch({
        type: ActionKind.SET_FORM_CONTENT,
        payload: {
          key: "state",
          value: state,
          error: "",
        },
      })
      dispatch({
        type: ActionKind.SET_FORM_CONTENT,
        payload: {
          key: "country",
          value: country,
          error: "",
        },
      })
    })
  }, [autocompleteRef])

  return (
    <>
      <div className="input-container">
        <input
          name="address"
          placeholder="Address"
          id="address"
          className={formState?.address?.error ? "error" : ""}
          onChange={handleAddressChange}
          value={formState.address.value}
          ref={autocompleteRef}
        />
        {formState.address.error && (
          <span className="error-message">{formState?.address?.error}</span>
        )}
      </div>
      {formState.placesResult.address_components && (
        <>
          <div className="input-container">
            <input
              name="zip_code"
              placeholder="ZIP Code"
              id="zip_code"
              className={formState?.zip_code?.error ? "error" : ""}
              value={formState.zip_code.value}
              disabled={true}
            />
            {formState.phone_number.error && (
              <span className="error-message">
                {formState?.zip_code?.error}
              </span>
            )}
          </div>
          <div className="input-container">
            <input
              name="city"
              placeholder="City"
              id="city"
              className={formState?.city?.error ? "error" : ""}
              value={formState.city.value}
              disabled={true}
            />
            {formState.city.error && (
              <span className="error-message">{formState?.city?.error}</span>
            )}
          </div>
          <div className="input-container">
            <input
              name="state"
              placeholder="State"
              id="state"
              className={formState?.state?.error ? "error" : ""}
              value={formState.state.value}
              disabled={true}
            />
            {formState.state.error && (
              <span className="error-message">{formState?.state?.error}</span>
            )}
          </div>
          <div className="input-container">
            <input
              name="country"
              placeholder="Country"
              id="country"
              className={formState?.country?.error ? "error" : ""}
              value={formState.country.value}
              disabled={true}
            />
            {formState.country.error && (
              <span className="error-message">{formState?.country?.error}</span>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Address
