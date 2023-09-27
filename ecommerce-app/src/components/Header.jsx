import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Model from "../components/Model";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import axios from "axios";
import Cookies from "js-cookie";
export const Header = () => {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showRegisterModel, setShowRegisterModel] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const login = () => {
    setLoggedIn(true);
  };
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState();

  const hanleSearch = (e) => {
    setSearch(e.target.value);
  };

  const openLoginModel = () => {
    setShowLoginModel(true);
    setIsLoginForm(true);
  };
  const openRegisterModel = () => {
    setShowRegisterModel(true);
    setIsLoginForm(false);
  };

  const closeModal = () => {
    setShowLoginModel(false);
    setShowRegisterModel(false);
  };
  useEffect(() => {
    // Lấy token từ cookie
    const cookie = document.cookie;
    console.log(cookie);

    if (cookie) {
      const token = cookie.split("; ").find((row) => row.startsWith("token="));
      if (token) {
        // Nếu có token, thực hiện yêu cầu API để nhận thông tin người dùng
        axios
          .get("http://127.0.0.1:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((response) => {
            setUser(response.data);
            const cookieValue = response.headers["set-cookie"];
            console.log(cookieValue);
          })
          .catch((error) => {
            console.error("Lỗi khi nhận thông tin người dùng:", error);
          });
      }
    }
  }, []);

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <>
      <header className="fixed w-full h-[80px] bg-white border-b rounded">
        <div className="h-full py-6 px-4 items-center justify-between hidden 800px:flex">
          <div className="relative flex cursor-pointer">
            <Link to="/">
              <span className="text-2xl font-bold text-pink-500">QHoaTuoi</span>
              <img
                className="max-w-[30px] absolute top-[-10px] right-[-2rem] bg-transparent"
                src={require("../assets/images/icon_hoa.png")}
                alt=""
              />
            </Link>
          </div>
          <div className="w-[50%] relative h-[40px]">
            <input
              type="text"
              placeholder="Nhập để tìm kiếm"
              value={search}
              onChange={hanleSearch}
              className="h-full w-full p-4 bg-[#ede3e3] rounded-sm focus:border-pink-500 focus:bg-white"
            />
            <FiSearch
              size={20}
              className="absolute top-2.5 right-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 show-sm-2 p-4 z-[9]">
                {searchData.map((item, index) => {
                  <Link to={`/product/${item.name}`}>
                    <div className="w-full flex items-start">
                      <img
                        src={item.img.url}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>item.name</h1>
                    </div>
                  </Link>;
                })}
              </div>
            ) : null}
          </div>
          {user ? (
            <div>
              <p>Xin chào, {user.name}!</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[40px]">
              <button
                className="flex items-center justify-center h-full text-[15px] font-bold py-3 px-5 mr-2 border border-slate-300 rounded-sm"
                onClick={openLoginModel}
              >
                Đăng nhập
              </button>
              <button
                className="flex items-center justify-center h-full text-[15px] font-bold py-3 px-5 rounded-sm bg-pink-500 text-white hover:bg-pink-600"
                onClick={openRegisterModel}
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </header>
      <Model isVisible={showLoginModel || showRegisterModel}>
        {isLoginForm ? (
          <Login login={login} switchToRegister={switchForm} closeModal={closeModal} />
        ) : (
          <Register switchToLogin={switchForm} closeModal={closeModal} />
        )}
      </Model>
    </>
  );
};
export default Header;
