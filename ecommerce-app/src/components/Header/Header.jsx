import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import Model from "../Model";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Navbar from "../Nav/Navbar";
import Swal from "sweetalert2";
import apiClient from "../../server";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../redux/slices/userSlice";
import logo from "../../assets/images/icon_hoa.png"

export const Header = ({ navActive }) => {
  //Redux data
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLogin);

  //UseState open menu icon
  const [isMenu, setIsMenu] = useState(false);
  //UseState Model form
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showRegisterModel, setShowRegisterModel] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  //Fetch data search
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const hanleSearch = (e) => {
    setSearch(e.target.value);
    apiClient.get(`search/products?name=${e.target.value}`).then(({ data }) => {
      if (e.target.value) {
        setSearchData(data.products);
      } else {
        setSearchData([]);
      }
    });
  };

  //Handle modal form
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

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  //Logout
  const logout = () => {
    try {
      apiClient.post("logout").then(({ data }) => {
        dispatch(userAction.logout());
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: true,
          timer: 2000,
          confirmButtonText: "OK",
        });
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: error,
        showConfirmButton: true,
        timer: 2000,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <header className="w-full h-[150px] bg-white shadow-[0_0.5rem_1rem_rgba(0, 0, 0, 0.1)]">
        {/* Top Header */}
        <div className="h-[20px] items-center justify-between bg-[#f72f92] p-3 hidden 800px:flex">
          <div className="flex items-center justify-center">
            <FaShippingFast size={20} color="white" />
            <span className="text-white ml-1">
              Free Ship với đơn hàng trên 99.99$
            </span>
          </div>

          {isLogin ? (
            <div className="flex items-center justify-center">
              <p className=" h-full text-[15px] text-white">
                Xin chào, {JSON.parse(userInfo).name}
              </p>
              <p className="text-white mx-3"> | </p>
              <span
                className="h-full text-[15px] text-white cursor-pointer hover:text-[#ffffffb3]"
                onClick={logout}
              >
                Đăng Xuất
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span
                className="h-full text-[15px] text-white cursor-pointer hover:text-[#ffffffb3]"
                onClick={openLoginModel}
              >
                Đăng nhập
              </span>
              <p className="text-white mx-3"> | </p>
              <span
                className="h-full text-[15px] text-white cursor-pointer hover:text-[#ffffffb3]"
                onClick={openRegisterModel}
              >
                Đăng ký
              </span>
            </div>
          )}
        </div>
        {/* Middle Header */}
        <div className="h-[70px] py-6 px-4 items-center justify-between hidden 800px:flex">
          {/* Logo Home */}
          <div className="relative flex cursor-pointer">
            <Link to="/">
              <span className="text-2xl font-bold text-pink-500">QHoaTuoi</span>
              <img
                className="max-w-[30px] absolute top-[-10px] right-[-2rem] bg-transparent"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          {/* Serach Bar */}
          <div className="w-[50%] relative h-[40px]">
            <input
              type="text"
              name="search"
              placeholder="Nhập để tìm kiếm"
              value={search}
              onChange={hanleSearch}
              className="h-full w-full p-4 bg-[#ede3e3] rounded-sm focus:border-pink-500 "
            />
            <FiSearch
              size={20}
              className="absolute top-2.5 right-1.5 cursor-pointer"
            />
            {searchData.length > 0 && (
              <div className="absolute max-h-[500px] bg-white overflow-y-scroll top-11 shadow-[#ddd] shadow-md rounded-sm z-[9] w-full">
                {searchData.map((i) => (
                  <Link to={`/products/${i.product_id}`}>
                    <div className="w-full flex items-start p-3 rounded-sm hover:bg-[#efefef]">
                      <img
                        src={i.product_img}
                        className="h-[50px] w-[50px] mr-[10px] bg-transparent"
                      />
                      <div className="flex-row ">
                        <h1 className="text-[17px] font-medium hover:font-bold">
                          {i.product_name}
                        </h1>
                        <span>{i.product_price} Đ</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Setting Icons */}
          <div className="flex items-center justify-center">
            <div className="relative mx-[10px] cursor-pointer">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#e84393] w-5 h-5 text-white text-[16px] p-0 m-0 leading-tight text-center">
                0
              </span>
            </div>
            <div className="relative mx-[10px] cursor-pointer">
              <AiOutlineHeart size={30} />
              <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#e84393] w-5 h-5 text-white text-[16px] p-0 m-0 leading-tight text-center">
                0
              </span>
            </div>
          </div>
        </div>
        {/* Bottom Header */}
        <div className="h-[calc(100%-90px)] p-3 items-center justify-center bg-[#eee3e3] hidden 800px:flex ">
          <Navbar active={navActive} />
        </div>
      </header>

      {/* Header mobile */}
      <header className="800px:hidden bg-white w-full h-full absolute top-0 left-0">
        {/* Logo Home */}
        <div className="flex justify-between cursor-pointer p-3 border-b border-[#555]">
          <Link to="/">
            <span className="text-2xl font-bold text-pink-500">QHoaTuoi</span>
            <img
              className="max-w-[30px] absolute top-[-10px] right-[-2rem] bg-transparent"
              src={logo}
              alt="Logo Moblie"
            />
          </Link>
          {/* Menu icon */}
          <div
            onClick={() => setIsMenu(!isMenu)}
            className="flex justify-center items-center"
          >
            {isMenu == false ? (
              <AiOutlineMenu size={25} />
            ) : (
              <AiOutlineClose size={25} />
            )}
          </div>
        </div>
        {/* Serach Bar */}
        <div className="w-full relative h-[65px] p-3">
          <input
            type="text"
            name="search"
            placeholder="Nhập để tìm kiếm"
            value={search}
            onChange={hanleSearch}
            className="h-full w-full p-4 bg-[#ede3e3] rounded-sm focus:border-pink-500 "
          />
          <FiSearch
            size={20}
            className="absolute top-[1.2rem] right-[1.5rem] cursor-pointer"
          />
        </div>
        <div
          className={` absolute duration-500 h-full w-full ${
            isMenu ? "left-0" : "left-[-100%]"
          }`}
        >
          <Navbar active={navActive} />
        </div>
      </header>
      <Model isVisible={showLoginModel || showRegisterModel}>
        {isLoginForm ? (
          <Login switchToRegister={switchForm} closeModal={closeModal} />
        ) : (
          <Register switchToLogin={switchForm} closeModal={closeModal} />
        )}
      </Model>
    </>
  );
};
export default Header;
