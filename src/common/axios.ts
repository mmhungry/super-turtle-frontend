import axios from "axios";

const token = localStorage.getItem("token");

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export default baseAxios;
// import axios from "axios";

// const facialTransformToken = localStorage.getItem("token");
// const genderClassificationToken = "gender-class-ztn6vhv6avc-AMT2hkh";

// const facialTransformApi = axios.create({
//   baseURL: import.meta.env.VITE_APP_API_URL as string,
//   headers: {
//     Authorization: `Bearer ${facialTransformToken}`,
//     "Content-Type": "application/json",
//   },
//   withCredentials: false,
// });
// const genderApi = axios.create({
//   baseURL: "https://3dn4evazn4.execute-api.ap-southeast-1.amazonaws.com/prod",
//   headers: {
//     Authorization: `Bearer ${genderClassificationToken}`,
//     "Content-Type": "application/json", 
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
//   },
//   withCredentials: false,
// });
// export {facialTransformApi, genderApi};
