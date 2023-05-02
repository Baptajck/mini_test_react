import { useEffect, useState } from "react";
import TaskItem from "../components/Task/TaskItem";
import Button from "../components/Button/Button";
import TextInput from "../components/Input/TextInput";
import { toast } from "react-toastify";
import TasksList from "../components/Task/TasksList";
import Spinner from "../components/Spinner/Spinner";

function Task() {
  const [todo, setTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);
  const [checkItem, setCheckItem] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch(`${process.env.REACT_APP_API}/tasks`)
      .then((res) => res.json())
      .then((list) => {
        setTodo(
          list
            .filter((el) => !el.isDone)
            .map((item) => ({ ...item, completed: false }))
        );
        setDoneTodo(list.filter((el) => el.isDone));
      });
  };

  const handleNewTask = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Ajout...", { autoClose: 3000 });

    fetch(`${process.env.REACT_APP_API}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        description: newTask,
        isDone: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        getList();
        setNewTask("");
        toast.update(toastId, {
          render: "La tâche a bien été ajoutée !",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Une erreur est survenue...",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  const handleClickItem = () => {
    /**
     * Json-server n'autorise pas l'update de plusieurs
     * données en même temps, c'est pourquoi
     * j'ai du passer par un forEach
     * mais en temps normal j'aurais envoyé un tableau d'id et
     * laissé le back faire ce qu'il faut
     */
    const toastId = toast.loading("Modification...", { autoClose: 3000 });
    checkItem.forEach((el) => {
      fetch(`${process.env.REACT_APP_API}/tasks/${el}`, {
        method: "PATCH",
        body: JSON.stringify({
          isDone: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(() => {
          getList();
          setCheckItem([]);
          toast.update(toastId, {
            render: "Les listes ont été mises à jour !",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch(() => {
          toast.update(toastId, {
            render: "Une erreur est survenue...",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    });
  };

  return (
    <div>
      <h1 className="mb-2 mt-5 text-center text-3xl font-bold uppercase tracking-wider text-white-500">
        Gestion des tâches
      </h1>
      {todo.length !== 0 ? (
        <>
          <p className="text-center text-lg text-white-500">
            Nombre total : {todo.length + doneTodo.length} tâche
            {todo.length + doneTodo.length > 1 ? "s" : ""}
          </p>
          <form
            className="mb-5 flex w-full flex-col items-center justify-center md:p-5"
            onSubmit={handleNewTask}
          >
            <div className="w-4/5">
              <TextInput
                placeholder="Ajouter une tâche"
                value={newTask}
                setValue={setNewTask}
              />
            </div>
            <div className="flex w-4/5 flex-col items-center justify-center md:flex-row">
              <Button
                text="Ajouter"
                type="submit"
                className={"my-1 w-1/2 md:mr-2 md:w-1/5"}
                disabled={newTask.length === 0}
              />
              <Button
                text="Mettre à jour"
                action={handleClickItem}
                disabled={checkItem.length === 0}
                className={"my-1 w-1/2 md:w-1/5"}
              />
            </div>
          </form>
          <div className="flex w-full flex-col md:flex-row md:justify-center">
            <TasksList
              title={`${todo.length} tâche${
                todo.length > 1 ? "s" : ""
              } restante${todo.length > 1 ? "s" : ""}`}
            >
              {todo.map(({ description, completed, id }, i) => (
                <TaskItem
                  key={i}
                  name={id}
                  check={completed}
                  setTodo={setTodo}
                  todo={todo}
                  setCheckItem={setCheckItem}
                >
                  {description}
                </TaskItem>
              ))}
            </TasksList>

            <TasksList
              title={`${doneTodo.length} tâche${
                doneTodo.length > 1 ? "s" : ""
              } terminée${doneTodo.length > 1 ? "s" : ""}`}
            >
              {doneTodo.map(({ description, id }, i) => (
                <TaskItem key={i} name={id} disabled>
                  {description}
                </TaskItem>
              ))}
            </TasksList>
          </div>
        </>
      ) : (
        <Spinner loading={todo.length === 0} />
      )}
    </div>
  );
}

export default Task;
