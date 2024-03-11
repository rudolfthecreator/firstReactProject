import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";
import PostService from "../API/PostService";
import MyButton from "../components/UI/button/MyButton";
import MyToggle from "../components/UI/toggle/MyToggle";
import MyInput from "../components/UI/input/MyInput";
import Loader from "../components/UI/Loader/Loader";

const About = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ title: "", body: "" });
  const [checked, setChecked] = useState(false);

  const items = async () => {
    setLoading(true);
    const test = await PostService.getTasks();
    setLoading(false);
    setTasks(test);
  };

  const addNew = async (e) => {
    e.preventDefault();
    await PostService.addTask(post);
    setPost({ title: "", body: "" });
    items();
  };

  const deleteOne = async (e, id) => {
    e.preventDefault();
    await PostService.deleteTask(id);
    items();
  };

  const doneOne = async (e, id) => {
    e.preventDefault();
    await PostService.doneTask(id);
    items();
  };

  const curTasks = useMemo(() => {
    return tasks.filter((t) => !t.done);
  }, [tasks]);

  const doneTasks = useMemo(() => {
    return tasks.filter((t) => t.done);
  }, [tasks]);

  useEffect(() => {
    items();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="tasks__container">
          <form>
            <MyInput
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              type="text"
              placeholder="Задача"
            />
            <MyInput
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              type="text"
              placeholder="Описание"
            />
            <MyButton onClick={addNew}>Создать</MyButton>
          </form>
          <div className="toggle">
            <h1 style={{ color: checked ? "grey" : "#2196f3" }}>Задачи:</h1>
            <MyToggle
              checked={checked}
              onChange={(e) => setChecked(!checked)}
            />
            <h1 style={{ color: checked ? "green" : "grey" }}>Выполнено:</h1>
          </div>
          {checked ? (
            doneTasks.length ? (
              doneTasks.map((task, index) => (
                <div key={task.taskId}>
                  <h2>
                    {index + 1}. {task.title}
                  </h2>
                  <h4>{task.body}</h4>
                </div>
              ))
            ) : (
              <div style={{ color: "red" }}>Нет выполненных задач.</div>
            )
          ) : curTasks.length ? (
            curTasks.map((task, index) => (
              <div key={task.taskId}>
                <h2>
                  {index + 1}. {task.title}
                </h2>
                <h4>{task.body}</h4>
                <MyButton onClick={(e) => deleteOne(e, task.taskId)}>
                  Удалить
                </MyButton>
                <MyButton onClick={(e) => doneOne(e, task.taskId)}>
                  Выполнено
                </MyButton>
              </div>
            ))
          ) : (
            <div>Нет актуальных задач.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
