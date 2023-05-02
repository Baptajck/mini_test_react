import { useState } from "react";
import { ReactComponent as Eye } from "../../assets/svg/eye.svg";
import { ReactComponent as Hide } from "../../assets/svg/hide.svg";

function TextInput({
  type = "text",
  label = "",
  isPassword = false,
  pattern = "",
  value = "",
  setValue = "",
  placeholder = "",
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (v) => {
    const regex = pattern;

    if (!regex.test(v) && isPassword) {
      setErrorMessage("Le mot de passe doit contenir entre 8 et 15 caractères");
    } else if (!regex.test(v) && !isPassword) {
      setErrorMessage("Le login ne doit contenir que des caractères");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="my-5 w-full">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-white-500 md:text-base"
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={(e) => {
            if (!!pattern) {
              handleError(e.target.value);
            }
            setValue(e.target.value);
          }}
          value={value}
          type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
          maxLength={isPassword ? 15 : null}
          id={label}
          placeholder={placeholder}
          autoComplete="off"
          className=" block w-full rounded-lg border bg-dark-100 p-2.5 text-sm text-white-500 focus:outline-none"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center px-2.5"
          >
            {isPasswordVisible ? <Hide /> : <Eye />}
          </button>
        ) : null}
      </div>
      {errorMessage && value.length !== 0 && (
        <div className="mt-2 w-full text-xs text-red-500 md:text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default TextInput;
