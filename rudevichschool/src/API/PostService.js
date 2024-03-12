import axios from "axios";

export default class PostService {
  static async getTasks() {
    const { data } = await axios.get("http://localhost:5262/Tasks/getTasks");
    return data;
  }

  static async getQuestions() {
    const { data } = await axios.get(
      "http://localhost:5262/Questions/getQuestions"
    );
    return data;
  }

  static async getAnswers() {
    const { data } = await axios.get(
      "http://localhost:5262/Questions/getAnswers"
    );
    return data;
  }

  static async addTask(task) {
    await axios.post("http://localhost:5262/Tasks/addTask", task);
  }

  static async addQuestion(question) {
    await axios.post("http://localhost:5262/Questions/addQuestion", {
      ...question,
      answer: "",
    });
  }

  static async answerQuestion(question) {
    await axios.post(
      "http://localhost:5262/Questions/updateQuestion",
      question
    );
  }

  static async updateCount(question) {
    await axios.post("http://localhost:5262/Questions/updateCount", question);
  }

  static async deleteTask(id) {
    await axios.delete(`http://localhost:5262/Tasks/deleteTask/${id}`);
  }

  static async deleteQuestion(id) {
    await axios.delete(`http://localhost:5262/Questions/deleteQuestion/${id}`);
  }

  static async doneTask(id) {
    await axios.post(`http://localhost:5262/Tasks/doneTask/${id}`);
  }

  // static async getAll(limit = 10, page = 1) {
  //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
  //         params: {
  //             _limit: limit,
  //             _page: page
  //         }
  //     })
  //     return response;
  // }

  // static async getById(id) {
  //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
  //     return response;
  // }

  // static async getCommentsByPostId(id) {
  //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  //     return response;
  // }
}
