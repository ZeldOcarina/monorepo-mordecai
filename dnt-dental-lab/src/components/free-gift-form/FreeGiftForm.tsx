import "react-phone-input-2/lib/style.css"

import React, { useEffect, useReducer } from "react"
import { Script, navigate } from "gatsby"
import styled from "styled-components"

import PhoneInput, { CountryData } from "react-phone-input-2"

import useShortcodes from "@zeldocarina/gatsby-theme-mordecai/src/hooks/useShortcodes"
import MarkdownParser from "@zeldocarina/gatsby-theme-mordecai/src/helpers/MarkdownParser"

import StyledForm from "@zeldocarina/gatsby-theme-mordecai/src/components/form/formStyles"

import FormHandler from "./FormHandler"
import PuffLoader from "react-spinners/PuffLoader"
import Address from "./Address"
import formStyles from "@zeldocarina/gatsby-theme-mordecai/src/components/form/formStyles"

const FreeGiftForm = styled(formStyles)`
  input:disabled {
    color: #b9b9b9;
  }
`

interface FormProps {
  title: string
  cta: string
  isMapLoaded: boolean
  privacyLabel: string
}

const initialState = {
  first_name: { value: "", error: "" },
  last_name: { value: "", error: "" },
  license_number: { value: "", error: "" },
  address: { value: "", error: "" },
  city: { value: "", error: "" },
  state: { value: "", error: "" },
  zip: { value: "", error: "" },
  country: { value: "", error: "" },
  email: { value: "", error: "" },
  phone_number: { value: "", country_code: "", error: "" },
  service: {
    value: {
      value: "",
      label: "",
    },
    error: "",
  },
  message: { value: "", error: "" },
  privacy_accepted: { value: false, error: "" },
  isSubmissionFailed: false,
  submitted: false,
  loading: false,
  placesResult: {},
}

type FormState = typeof initialState

export enum ActionKind {
  SET_FORM_CONTENT = "SET_FORM_CONTENT",
  SET_PHONE_NUMBER = "SET_PHONE_NUMBER",
  SET_LOADING = "SET_LOADING",
  SET_SUCCESSFUL_SUBMISSION = "SET_SUCCESSFUL_SUBMISSION",
  SET_FORM_ERROR = "SET_FORM_ERROR",
  VALIDATE_FORM = "VALIDATE_FORM",
  SET_DEFAULT_SERVICE = "SET_DEFAULT_SERVICE",
  ADDRESS_INPUT = "ADDRESS_INPUT",
  PLACE_SELECTED = "PLACE_SELECTED",
}

interface FormAction {
  type: ActionKind
  payload: any
}

// And in your reducer
function formReducer(formState: FormState, action: FormAction): FormState {
  switch (action.type) {
    case ActionKind.PLACE_SELECTED:
      return {
        ...formState,
        placesResult: { ...action.payload },
      }
    case ActionKind.ADDRESS_INPUT:
      return {
        ...formState,
        address: {
          value: action.payload,
          error: "",
        },
      }
    case ActionKind.SET_DEFAULT_SERVICE:
      return {
        ...formState,
        service: {
          value: {
            value: "",
            label: action.payload,
          },
          error: "",
        },
      }
    case ActionKind.SET_FORM_CONTENT:
      return {
        ...formState,
        [action.payload.key]: {
          value: action.payload.value,
          error: action.payload.error || "",
        },
      }
    case ActionKind.SET_PHONE_NUMBER:
      return {
        ...formState,
        phone_number: {
          value: action.payload.value,
          country_code: action.payload.country_code || "",
          error: action.payload.error,
        },
      }
    case ActionKind.SET_LOADING:
      return { ...formState, loading: action.payload }
    case ActionKind.VALIDATE_FORM:
      const newState = { ...formState }
      action.payload.keys.forEach((key: string) => {
        newState[key] = {
          ...formState[key],
          error: action.payload.errors[key],
        }
      })
      return newState

    case ActionKind.SET_SUCCESSFUL_SUBMISSION:
      return { ...formState, isSubmissionFailed: false, submitted: true }
    case ActionKind.SET_FORM_ERROR:
      return { ...formState, isSubmissionFailed: true, submitted: false }

    default:
      return formState
  }
}

const Form = ({ title, cta, privacyLabel, isMapLoaded }: FormProps) => {
  const shortcodes = useShortcodes()

  const [formState, dispatch] = useReducer(formReducer, initialState)
  const { submitted, isSubmissionFailed, loading } = formState

  // useEffect(() => {
  //   console.log(formState);
  // }, [formState]);

  const parsedPrivacyLabel = new MarkdownParser({
    inputMarkdown: privacyLabel,
    shortcodes,
  }).parseHtml()

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | string,
    type: CountryData | {} | null,
  ) {
    if (type && "countryCode" in type) {
      dispatch({
        type: ActionKind.SET_PHONE_NUMBER,
        payload: {
          value: e,
          error: "",
          country_code: (type as CountryData).countryCode,
        },
      })
    } else {
      const { name, value } = (e as React.ChangeEvent<HTMLInputElement>).target

      dispatch({
        type: ActionKind.SET_FORM_CONTENT,
        payload: {
          key: name,
          value:
            (e as React.ChangeEvent<HTMLInputElement>).target.type ===
            "checkbox"
              ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
              : value,
          error: "",
        },
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submitting")
    console.log(formState)
    e.preventDefault()

    const searchParams = new URLSearchParams(window.location.search)

    const formHandler = new FormHandler({
      formData: formState,
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_term: searchParams.get("utm_term"),
      utm_content: searchParams.get("utm_content"),
      utm_id: searchParams.get("utm_id"),
      isContactForm: true,
    })

    const validationErrors = formHandler.validateForm()

    const validationErrorKeys = Object.keys(validationErrors)
    dispatch({
      type: ActionKind.VALIDATE_FORM,
      payload: { errors: validationErrors, keys: validationErrorKeys },
    })

    if (validationErrorKeys.length !== 0) return

    dispatch({ type: ActionKind.SET_LOADING, payload: true })

    try {
      await formHandler.submitForm(formState)

      dispatch({ type: ActionKind.SET_SUCCESSFUL_SUBMISSION, payload: null })

      navigate("/thank-you")
    } catch (err) {
      console.log(err)
      dispatch({ type: ActionKind.SET_FORM_ERROR, payload: null })
    } finally {
      dispatch({ type: ActionKind.SET_LOADING, payload: false })
    }
  }

  const formTitle = function setTitleString() {
    if (submitted) return <h3 className="green">Form Submitted</h3>
    if (isSubmissionFailed)
      return <h3 className="red">Form Submittion Failed</h3>
    return <h3>{title}</h3>
  }

  return (
    <FreeGiftForm onSubmit={handleSubmit}>
      {formTitle()}
      <div className="name-container">
        <div className="input-container">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className={formState?.first_name?.error ? "error" : ""}
            onChange={e => handleInputChange(e, null)}
            value={formState?.first_name?.value}
          />
          <span className="error-message">{formState?.first_name?.error}</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className={formState?.last_name?.error ? "error" : ""}
            onChange={e => handleInputChange(e, null)}
            value={formState?.last_name?.value}
          />
          <span className="error-message">{formState?.last_name?.error}</span>
        </div>
      </div>
      <div className="input-container">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={formState?.email?.error ? "error" : ""}
          onChange={e => handleInputChange(e, null)}
          value={formState?.email?.value}
        />
        <span className="error-message">{formState?.email?.error}</span>
      </div>
      <div className="input-container">
        <input
          type="text"
          name="license_number"
          placeholder="License Number"
          className={formState?.license_number?.error ? "error" : ""}
          onChange={e => handleInputChange(e, null)}
          value={formState?.license_number?.value}
        />
        <span className="error-message">
          {formState?.license_number?.error}
        </span>
      </div>
      {isMapLoaded && <Address formState={formState} dispatch={dispatch} />}
      <div className="input-container">
        <PhoneInput
          inputProps={{ name: "phone_number", placeholder: "Phone Number" }}
          country="us"
          // @ts-ignore
          id="phone_number"
          placeholder="Phone Number"
          className={formState?.phone_number?.error ? "error" : ""}
          containerClass="input"
          dropdownClass="tel-dropdown"
          onChange={(e, type) => handleInputChange(e, type)}
        />
        {formState.phone_number.error && (
          <span className="error-message">
            {formState?.phone_number?.error}
          </span>
        )}
      </div>

      <div className="input-container">
        <textarea
          name="message"
          placeholder="Enter your comments"
          className={formState?.message?.error ? "error" : ""}
          onChange={e => handleInputChange(e, null)}
          value={formState?.message?.value}
        />
        <span className="error-message">{formState?.message?.error}</span>
      </div>
      <div className="privacy-container">
        <input
          type="checkbox"
          name="privacy_accepted"
          id="privacy_accepted"
          checked={formState?.privacy_accepted?.value}
          onChange={e => handleInputChange(e, null)}
          required
        />
        <label htmlFor="privacy_accepted" className="checkbox-label">
          {parsedPrivacyLabel}
        </label>
      </div>
      <button className="submit-btn" type="submit" disabled={submitted}>
        {cta}
      </button>
      {loading && (
        <>
          <div className="loader-container">
            <PuffLoader color={"var(--white)"} loading={loading} size={100} />
          </div>
          <div className="overlay"></div>
        </>
      )}
    </FreeGiftForm>
  )
}

export default Form
