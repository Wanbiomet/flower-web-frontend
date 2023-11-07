import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;

    return config
})

apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      try {
        const { response } = error;
        if (response.status === 401) {
          //    401 Unauthorized;
          localStorage.removeItem("ACCESS_TOKEN");
        }
        if (response.status === 405) {
          alert("Method Not Allowed");
        }
        return response;
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  export default apiClient;