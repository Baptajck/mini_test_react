import clsx from "clsx";

function TaskItem({
  children,
  name = "",
  disabled = false,
  check = false,
  setCheckItem = () => {},
  setTodo = () => {},
  todo = [],
}) {
  return (
    <li
      className={clsx(
        "w-full border-b border-indigo-200 bg-dark-300",
        !disabled && "hover:bg-dark-500",
        disabled && "opacity-75"
      )}
    >
      <div className="flex items-center pl-3">
        <input
          id={name}
          type="checkbox"
          value=""
          disabled={disabled}
          checked={!disabled ? check : disabled}
          onChange={(e) => {
            setTodo(
              todo.map((task) =>
                +task.id === +e.target.id
                  ? { ...task, completed: !task.completed }
                  : task
              )
            );
            if (e.target.checked) {
              setCheckItem((prevState) => [...prevState, e.target.id]);
            } else {
              setCheckItem((prevState) =>
                prevState.filter((item) => item !== e.target.id)
              );
            }
          }}
          className={clsx(
            "h-4 w-4 rounded border-dark-300 bg-dark-500 accent-purple-500",
            disabled && "disabled"
          )}
        />
        <label
          htmlFor={name}
          className={clsx(
            "ml-2 w-full py-3 pr-3 text-justify text-sm font-medium text-white-500",
            disabled && "line-through"
          )}
        >
          {children}
        </label>
      </div>
    </li>
  );
}

export default TaskItem;
