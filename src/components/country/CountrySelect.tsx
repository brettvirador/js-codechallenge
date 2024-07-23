import countries from "i18n-iso-countries";
import Select from "react-select";
import { CountrySelectOption } from "./CountrySelectOption";

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// --- TASK G: DONE ---
// Please replace "any" with a proper type in this file (and where it is needed).

// Props
export type CountrySelectValue = {
  code: string;
  name: string;
};

export type CountrySelectData = {
  label: string;
  value: CountrySelectValue;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange?: (value: CountrySelectValue) => void;
}

// Constants
export const DEFAULT_COUNTRY = {
  code: "US",
  name: "United States of America",
};

// Component
export const CountrySelect = ({
  value = DEFAULT_COUNTRY,
  onChange,
}: CountrySelectProps) => {
  // Prepare Data
  const data: CountrySelectData[] = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => {
    return {
      value: { code, name },
      label: name,
    };
  });
  const defaultValue: CountrySelectData = { value: value, label: value.name };

  // Render
  return (
    <div>
      <label>
        Country
        <Select
          options={data}
          components={{ Option: CountrySelectOption }}
          defaultValue={defaultValue}
          onChange={(newValue) => {
            if (onChange && newValue) onChange(newValue.value);
          }}
        />
      </label>
    </div>
  );
};

export default CountrySelect;
