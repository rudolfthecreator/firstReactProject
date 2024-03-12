import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";
import PostService from "../API/PostService";
import MyButton from "../components/UI/button/MyButton";
import MyToggle from "../components/UI/toggle/MyToggle";
import MyInput from "../components/UI/input/MyInput";
import Loader from "../components/UI/Loader/Loader";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({ quest: "", answer: "" });

  const items = async () => {
    setLoading(true);
    const test = await PostService.getQuestions();
    setLoading(false);
    setQuestions(test);
  };

  const addNew = async (e) => {
    e.preventDefault();
    await PostService.addQuestion(question);
    setQuestion({ quest: "", answer: "" });
    items();
  };

  const deleteOne = async (e, id) => {
    e.preventDefault();
    await PostService.deleteQuestion(id);
    items();
  };

  const answerOne = async (e, question) => {
    e.preventDefault();
    setQuestion({
      ...question,
      answer: question.answer.length > 0 ? question.answer : " ",
    });
  };

  const addAnswer = async (e) => {
    e.preventDefault();
    console.log(question.answer.length);
    await PostService.answerQuestion(question);
    setQuestion({ quest: "", answer: "" });
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
          <form>
            <MyInput
              value={question.quest}
              onChange={(e) =>
                setQuestion({ ...question, quest: e.target.value })
              }
              type="text"
              placeholder="Вопрос"
            />
            {question.answer && (
              <MyInput
                value={question.answer}
                onChange={(e) =>
                  setQuestion({ ...question, answer: e.target.value })
                }
                type="text"
                placeholder="Ответ"
              />
            )}
            <MyButton onClick={addNew}>Создать</MyButton>
            {question.answer && (
              <MyButton onClick={addAnswer}>Ответить</MyButton>
            )}
          </form>
          {questions.length ? (
            questions.map((q, index) => (
              <div key={q.qId}>
                <h2>
                  {index + 1}. {q.quest}
                </h2>
                <h4>{q.answer}</h4>
                <MyButton onClick={(e) => deleteOne(e, q.qId)}>
                  Удалить
                </MyButton>
                <MyButton
                  onClick={(e) =>
                    answerOne(e, {
                      quest: q.quest,
                      answer: q.answer,
                      qId: q.qId,
                    })
                  }
                >
                  Ред.
                </MyButton>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
