import axios from "axios";

export const backendApi = axios.create({
  baseURL: "https://app-2-745605544913.us-central1.run.app/v1",
});