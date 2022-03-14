import Api from "./Api";

export default {
  getPosts() {
    return Api().get("posts");
  },
  getPostById(id) {
    return Api().get("posts/" + id);
  },
  createPost(data) {
    return Api().post("posts/add", data);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  }
};
