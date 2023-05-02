import clsx from "clsx";

function Button({
  text = "",
  type = "button",
  action = () => {},
  disabled = false,
  className = null,
}) {
  return (
    <div className={clsx("w-full md:w-1/3", className)}>
      <button
        onClick={action}
        disabled={disabled}
        type={type}
        className={clsx(
          "w-full cursor-not-allowed rounded-3xl bg-indigo-600 px-4 py-2 font-bold text-white-500 duration-200 ease-in-out",
          !disabled && "cursor-pointer opacity-100 hover:bg-indigo-700",
          disabled && "opacity-25"
        )}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
