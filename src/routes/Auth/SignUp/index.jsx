import React, { useEffect, useState } from "react";
import "../auth.scss";
import { ApiPost } from "../../../helpers/API/ApiData";
import HideIcon from "../../../assets/icons/hide.svg";
import ShowIcon from "../../../assets/icons/show.svg";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/HOC/Input";
import { toast } from "react-hot-toast";
import { useAtom } from "jotai";
import { REGISTERUSERDATA } from "../../../Jotai/atomType";

export default function SignUp() {
  const [inputValue, setInputValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const [registerUserData, setRegisterUserData] = useAtom(REGISTERUSERDATA);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onhandleChnage = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onToggleShowPassword = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const validateEmail = (email) => {
    let pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return pattern.test(email);
  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;
    if (!inputValue.userName) {
      formIsValid = false;
      error["userName"] = "Please enter your username.";
    }
    if (!inputValue.email) {
      formIsValid = false;
      error["email"] = "Please enter your email.";
    }
    if (inputValue.email && !validateEmail(inputValue.email)) {
      formIsValid = false;
      error["email"] = "Please enter valid email.";
    }
    if (!inputValue.password) {
      formIsValid = false;
      error["password"] = "Please enter your password.";
    }
    if (inputValue.password) {
      let pattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/
      );
      if (!pattern.test(inputValue.password)) {
        formIsValid = false;
        error["password"] =
          "Password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.";
      }
    }
    if (!inputValue.confirm_password) {
      formIsValid = false;
      error["confirm_password"] = "Please enter your confirm password.";
    }
    if (inputValue.confirm_password) {
      if (inputValue.confirm_password !== inputValue.password) {
        formIsValid = false;
        error["confirm_password"] = "Password does not match.";
      }
    }

    setErrors(error);
    return formIsValid;
  };

  const onSignup = () => {
    if (validateForm()) {
      setLoader(true);
      let payload = {
        email: inputValue.email.trim(),
        ...inputValue,
      };
      let data = [...registerUserData];
      let existUser = data.find((item) => item.email === payload.email);
      if (existUser) {
        toast.error("Email already exist");
        setLoader(false);
        return;
      }
      delete payload.confirm_password;
      ApiPost("users", payload)
        .then((res) => {
          setLoader(false);
          data.push(res.data);
          setRegisterUserData(data);
          localStorage.setItem("task-user-info", JSON.stringify(res.data));
          toast.success("Signup Successfully");
          navigate("/");
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoader(false);
        });
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="title">
          <h1>SignUp</h1>
        </div>
        <Input
          label={"Username"}
          type="text"
          placeholder="Username"
          name="userName"
          value={inputValue.userName || ""}
          onChange={onhandleChnage}
          errors={errors["userName"]}
          isRequired={true}
        />
        <Input
          label={"Email"}
          type="text"
          placeholder="Email"
          name="email"
          value={inputValue.email || ""}
          onChange={onhandleChnage}
          errors={errors["email"]}
          isRequired={true}
        />
        <Input
          label={"Password"}
          type={showPassword?.password ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={inputValue.password || ""}
          onChange={onhandleChnage}
          icon={showPassword?.password ? ShowIcon : HideIcon}
          onIconClick={() => onToggleShowPassword("password")}
          errors={errors["password"]}
          isRequired={true}
        />
        <Input
          label={"Confirm Password"}
          type={showPassword?.confirm_password ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirm_password"
          value={inputValue.confirm_password || ""}
          onChange={onhandleChnage}
          icon={showPassword?.confirm_password ? ShowIcon : HideIcon}
          onIconClick={() => onToggleShowPassword("confirm_password")}
          errors={errors["confirm_password"]}
          isRequired={true}
        />
        <div className="button">
          <button disabled={loader} onClick={onSignup}>
            Register
          </button>
        </div>
        <div className="text">
          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
}
