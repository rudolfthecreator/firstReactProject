import React, { useEffect, useState, useMemo } from "react";
import "../styles/App.css";
import PostService from "../API/PostService";
import MyButton from "../components/UI/button/MyButton";
import MyToggle from "../components/UI/toggle/MyToggle";
import MyInput from "../components/UI/input/MyInput";
import Loader from "../components/UI/Loader/Loader";

const Learning = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({ question1: "", answer: "" });

  const items = async () => {
    setLoading(true);
    const test = await PostService.getQuestions();
    setLoading(false);
    setQuestions(test);
  };

  const addNew = async (e) => {
    e.preventDefault();
    await PostService.addQuestion(question);
    setQuestion({ question1: "", answer: "" });
    items();
  };

  const deleteOne = async (e, id) => {
    e.preventDefault();
    await PostService.deleteQuestion(id);
    items();
  };

  const answerOne = async (e, question) => {
    e.preventDefault();
    setQuestion(question);
  };

  const addAnswer = async (e) => {
    e.preventDefault();
    await PostService.answerQuestion(question);
    setQuestion({ question1: "", answer: "" });
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
              value={question.question1}
              onChange={(e) =>
                setQuestion({ ...question, question1: e.target.value })
              }
              type="text"
              placeholder="Вопрос"
            />
            <MyInput
              value={question.answer}
              onChange={(e) =>
                setQuestion({ ...question, answer: e.target.value })
              }
              type="text"
              placeholder="Ответ"
            />
            <MyButton onClick={addNew}>Создать</MyButton>
            <MyButton onClick={addAnswer}>Сохранить</MyButton>
          </form>
          {questions.length ? (
            questions.map((q, index) => (
              <div key={q.questionId}>
                <h2>
                  {index + 1}. {q.question1}
                </h2>
                <h4>{q.answer}</h4>
                <MyButton onClick={(e) => deleteOne(e, q.questionId)}>
                  Удалить
                </MyButton>
                <MyButton
                  onClick={(e) =>
                    answerOne(e, {
                      question1: q.question1,
                      answer: q.answer,
                      questionId: q.questionId,
                    })
                  }
                >
                  Ответить
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

export default Learning;
