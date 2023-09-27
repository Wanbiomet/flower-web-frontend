import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import apiClient from "../../services/api";
const Login = ({ switchToRegister, closeModal }) => {
  const [open, setOpen] = useState(false);
  const togglePass = () => {
    setOpen(!open);
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email không được để trống !";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email không hợp lệ";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password không được để trống !";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password tối thiệu có 6 ký tự !";
    }
    setErrors(validationErrors);
    try {
      apiClient.get("/sanctum/csrf-cookie").then((response) => {
        const res = apiClient.post(
          "/login",
          formData
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
          timer: 2000,
          confirmButtonText: "OK",
        }).then(() => {
          setLoading(false);
          closeModal();
        });
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
          timer: 2000,
          confirmButtonText: "OK",
        }).then(() => {
          setLoading(false);
        });
      } else {
        console.error(error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="p-5 border rounded-lg shadow-md bg-white">
      <button
        className="text-black text-xl place-self-end"
        onClick={closeModal}
      >
        X
      </button>
      <h2 className="font-extrabold text-center text-3xl text-pink-500 uppercase ">
        Đăng nhập
      </h2>
      <form className="mt-8 flex flex-col mb-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-base font-medium shadow-black mb-2">
            Email
          </label>
          <input
            name="email"
            type="text"
            className="w-full bg-slate-100 border border-slate-300 rounded-sm h-12 p-4 mt-2 focus:border-pink-500 focus:bg-white"
            placeholder="name@company.com"
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-700 font-bold text-sm">
              {errors.email}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="text-base font-medium shadow-black mb-2">
            Mật Khẩu
          </label>
          <div className="relative">
            <input
              name="password"
              type={open === false ? "password" : "text"}
              className="w-full bg-slate-100 border border-slate-300 rounded-sm h-12 p-4 mt-2 focus:border-pink-500 focus:bg-white"
              placeholder="••••••••"
              onChange={handleChange}
            />
            <div className="absolute text-xl top-6 right-1 pr-3 flex items-center leading-5 cursor-pointer">
              {open === false ? (
                <AiFillEye onClick={() => togglePass()} />
              ) : (
                <AiFillEyeInvisible onClick={() => togglePass()} />
              )}
            </div>
            {errors.password && (
              <span className="text-red-700 font-bold text-sm">
                {errors.password}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <label className="cursor-pointer">
            <input id="remember-me" type="checkbox" />
            <span className="font-medium text-base"> Nhớ thông tin</span>
          </label>
          <a className="font-medium text-base text-pink-500 cursor-pointer">
            {" "}
            Quên mật khẩu ?
          </a>
        </div>
        <button
          disabled={loading}
          className="w-full h-10 bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-blue-600 border rounded-sm mt-3 text-lg text-white font-semibold"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
      <span className="mt-4 text-base font-medium text-gray-600">
        Chưa đăng ký?{" "}
        <a href="#" className="text-pink-500" onClick={switchToRegister}>
          Tạo tài khoản
        </a>
      </span>
    </div>
  );
};

export default Login;
