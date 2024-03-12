import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";
import PostService from "../API/PostService";
import MyButton from "../components/UI/button/MyButton";
import MyToggle from "../components/UI/toggle/MyToggle";
import MyInput from "../components/UI/input/MyInput";
import Loader from "../components/UI/Loader/Loader";

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const items = async () => {
    setLoading(true);
    const test = await PostService.getAnswers();
    setLoading(false);
    setAnswers(test);
  };

  const plusCount = async (e, quest) => {
    e.preventDefault();
    await PostService.updateCount(quest);
    items();
  };

  useEffect(() => {
    items();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="tasks__container">
          {answers.length ? (
            answers.map((q, index) => (
              <div key={q.qId}>
                <h2>
                  {index + 1}. {q.quest}
                </h2>
                <h4>
                  {q.answer} ({q.count}){" "}
                  <span>
                    <button onClick={(e) => plusCount(e, q)}>+</button>
                  </span>
                </h4>
              </div>
            ))
          ) : (
            <div>Список ответов пуст.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Answers;
