import React, { useMemo, useReducer, useRef } from "react";
import Modal from "react-modal";
import CountrySelect, {
  CountrySelectValue,
  DEFAULT_COUNTRY,
} from "../country/CountrySelect";
import LanguageSelect, {
  DEFAULT_LANGUAGE,
  LanguageSelectValue,
} from "../language/LanguageSelect";
import CurrencySelect, {
  CurrencySelectValue,
  DEFAULT_CURRENCY,
} from "../currency/CurrencySelect";
import "./SettingsSelector.styles.css";

/* --- [TASK: DONE] ---
Changes on modal are only applied on SAVE

CURRENT SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- Changes to any of the select inputs are immediately effective.
- The modal is dismissed using the **[Close]** button

DESIRED SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- There is a **[Save]** and a **[Cancel]** button, both serving to dismiss the modal.
- Changes are taking effect only on **[Save]**

FURTHER DETAILS
- Positioning of the buttons within the modal is not in the scope of this task
--- [TASK] --- */

/* --- [TASK: DONE] ---
Reduced number of unnecessary re-renders

CURRENT SCENARIO
- The `SettingsSelector`-Button re-renders too often
- It re-renders every time the modal is opened, closed, or on changing the select inputs

DESIRED SCENARIO
- The `SettingsSelector`-Button only re-renders when relevant data changes (Country, Language, Currency)

FURTHER DETAILS
- The `SettingsSelector`-Button has a render counter that will log to the console (do not remove)
- Be aware that #1 changes some relevant behaviour for this task
--- [TASK] --- */

/* --- [TASK: DONE] ---
Improved layout and styling of modal dialog (CSS)

CURRENT SCENARIO
- The modal dialog lacks intentional layout (spacings, dimensions).
- On smaller devices, the available space is not utilized effectively.

DESIRED SCENARIO
- Ensure consistent spacing, padding, and dimensions.
- Implement responsive or adaptive behavior for the modal, especially on smaller devices.

FURTHER DETAILS
- Focus on injecting and structuring CSS, using selectors and properties effectively.
- Feel free to apply your preferred spacing and dimensions; the provided designs mereley serve as examples. Just make sure it is consistent.
- Bonus points awarded for aesthetically appealing re-design of elements.
--- [TASK] --- */

/* --- [TASK: DONE] ---
Improved use of TypeScript

CURRENT SCENARIO
- In `SettingsSelector`, there are individual `useState()` calls for `Country`, `Language`, and `Currency`.
- Throughout the entire project, there are several instances of type `any`.
    Example: 
    ```typescript
    ... = React.useState<any>(DEFAULT_COUNTRY);
    ```
- Default values are constants that are exported by each component. 
    Example:
    ```typescript
    .... { DEFAULT_COUNTRY } from "../country/CountrySelect";
    ```

DESIRED SCENARIO
- Consolidate `Country`, `Language`, and `Currency` into a single "state".
- Extract default values from the components and make them configurable from a central point.
- Eliminate any remaining instances of type `any`.

OPTIONAL BONUS
- Replace `any` in the `*.stories.tsx`  files with appropriate types.
--- [TASK] --- */

/* --- [TASK: DONE] ---
 ReactDOM.render is no longer supported

CURRENT SCENARIO
- There is an error logging in the console
    `Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot`

DESIRED SCENARIO
- The error log does not appear
- The cause of the the warning is fixed

FURTHER DETAILS
- Downgrading to React 17 is not an option 😉
--- [TASK] --- */

// Types
type State = {
  country: CountrySelectValue;
  currency: CurrencySelectValue;
  language: LanguageSelectValue;
};

type Action =
  | { type: "SET_COUNTRY"; payload: CountrySelectValue }
  | { type: "SET_CURRENCY"; payload: CurrencySelectValue }
  | { type: "SET_LANGUAGE"; payload: LanguageSelectValue }
  | { type: "ALL"; payload: State };

const initialState: State = {
  country: DEFAULT_COUNTRY,
  currency: DEFAULT_CURRENCY,
  language: DEFAULT_LANGUAGE,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "ALL":
      return action.payload;
    default:
      return state;
  }
};

// Component
const SettingsSelector = (): JSX.Element => {
  // States
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [selectedValues, dispatchSelectedValues] = useReducer(
    reducer,
    initialState
  );
  const [finalValues, dispatchFinalValues] = useReducer(reducer, initialState);

  // Render Counter
  const counter = useRef(0);

  // Actions
  const handleOpen = () => {
    setModalIsOpen(true);
  };
  const handleCancel = () => {
    // reset "form"
    dispatchSelectedValues({
      type: "ALL",
      payload: {
        country: finalValues.country,
        currency: finalValues.currency,
        language: finalValues.language,
      },
    });
    // close modal
    setModalIsOpen(false);
  };
  const handleSave = () => {
    // set "form"
    dispatchFinalValues({
      type: "ALL",
      payload: {
        country: selectedValues.country,
        currency: selectedValues.currency,
        language: selectedValues.language,
      },
    });
    // close modal
    setModalIsOpen(false);
  };

  const button = useMemo(() => {
    // Increase render count.
    counter.current++;

    // Log current render count.
    console.log("Render count of button is: " + counter.current);

    /* Button */
    return (
      <button className="btn btn-primary" onClick={handleOpen}>
        <img
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${finalValues.country.code}.svg`}
          alt={finalValues.country.name}
          style={{
            aspectRatio: 16 / 9,
            width: "2rem",
          }}
        />
        {finalValues.country.name} - ({finalValues.currency} -{" "}
        {finalValues.language})
      </button>
    );
  }, [finalValues]);

  // Render
  return (
    <div>
      {button}

      {/* Modal */}
      <Modal
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={modalIsOpen}
      >
        {/* Header */}
        <h2 className="modal-header">
          Select your region, currency and language.
        </h2>

        <div className="modal-body">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          quis expedita labore unde deserunt commodi atque ipsum sapiente alias
          laboriosam, natus corrupti molestias adipisci placeat tempora dolorum
          dolor ex tempore! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates quis expedita labore unde deserunt commodi atque
          ipsum sapiente alias laboriosam, natus corrupti molestias adipisci
          placeat tempora dolorum dolor ex tempore! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptates quis expedita labore unde
          deserunt commodi atque ipsum sapiente alias laboriosam, natus corrupti
          molestias adipisci placeat tempora dolorum dolor ex tempore! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis
          expedita labore unde deserunt commodi atque ipsum sapiente alias
          laboriosam, natus corrupti molestias adipisci placeat tempora dolorum
          dolor ex tempore! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates quis expedita labore unde deserunt commodi atque
          ipsum sapiente alias laboriosam, natus corrupti molestias adipisci
          placeat tempora dolorum dolor ex tempore! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptates quis expedita labore unde
          deserunt commodi atque ipsum sapiente alias laboriosam, natus corrupti
          molestias adipisci placeat tempora dolorum dolor ex tempore! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis
          expedita labore unde deserunt commodi atque ipsum sapiente alias
          laboriosam, natus corrupti molestias adipisci placeat tempora dolorum
          dolor ex tempore! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates quis expedita labore unde deserunt commodi atque
          ipsum sapiente alias laboriosam, natus corrupti molestias adipisci
          placeat tempora dolorum dolor ex tempore! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptates quis expedita labore unde
          deserunt commodi atque ipsum sapiente alias laboriosam, natus corrupti
          molestias adipisci placeat tempora dolorum dolor ex tempore! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis
          expedita labore unde deserunt commodi atque ipsum sapiente alias
          laboriosam, natus corrupti molestias adipisci placeat tempora dolorum
          dolor ex tempore! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates quis expedita labore unde deserunt commodi atque
          ipsum sapiente alias laboriosam, natus corrupti molestias adipisci
          placeat tempora dolorum dolor ex tempore! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptates quis expedita labore unde
          deserunt commodi atque ipsum sapiente alias laboriosam, natus corrupti
          molestias adipisci placeat tempora dolorum dolor ex tempore! */}
          <div className="form-group">
            {/* Country */}
            <CountrySelect
              value={selectedValues.country}
              onChange={(value) =>
                dispatchSelectedValues({
                  type: "SET_COUNTRY",
                  payload: value,
                })
              }
            />

            {/* Currency */}
            <CurrencySelect
              value={selectedValues.currency}
              onChange={(value) =>
                dispatchSelectedValues({
                  type: "SET_CURRENCY",
                  payload: value,
                })
              }
            />

            {/* Language */}
            <LanguageSelect
              language={selectedValues.language}
              onChange={(value) =>
                dispatchSelectedValues({
                  type: "SET_LANGUAGE",
                  payload: value,
                })
              }
            />
          </div>
        </div>

        <div className="modal-footer">
          {/* Cancel button */}
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
          {/* Close button */}
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
