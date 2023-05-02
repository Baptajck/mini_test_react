function TasksList({ children = null, title = "" }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:justify-center">
      <div className="flex flex-col items-center md:w-4/5">
        <h2 className="font-bold text-white-500">{title}</h2>
        <ul className="m-5 h-4/5 w-4/5 overflow-auto rounded-lg border bg-dark-500 text-sm font-medium shadow-center shadow-indigo-400 scrollbar-thin scrollbar-track-dark-500 md:mx-0 md:w-full">
          {children}
        </ul>
      </div>
    </div>
  );
}

export default TasksList;
