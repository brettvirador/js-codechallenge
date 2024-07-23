import { SingleValueProps, components } from "react-select";
import { CountrySelectData } from "./CountrySelect";

// Component
export const CountrySelectSingleValue = (
  props: SingleValueProps<CountrySelectData, false>
) => {
  const { children, ...rest } = props;
  const { code, name } = props.getValue()[0].value;

  return (
    <components.SingleValue {...rest}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <img
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${code}.svg`}
          alt={name}
          style={{
            aspectRatio: 16 / 9,
            width: "2rem",
          }}
        />
        <span>{children}</span>
      </div>
    </components.SingleValue>
  );
};
