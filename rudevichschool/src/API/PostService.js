import axios from "axios";

export default class PostService {
  static async getTasks() {
    const { data } = await axios.get("http://localhost:5262/Tasks/getTasks");
    return data;
  }

  static async addTask(task) {
    await axios.post("http://localhost:5262/Tasks/addTask", task);
  }

  static async deleteTask(id) {
    await axios.delete(`http://localhost:5262/Tasks/deleteTask/${id}`);
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
