import axios from "@/libs/axios";

export const fetcher = (url) => axios.get(url).then((res) => res.data);