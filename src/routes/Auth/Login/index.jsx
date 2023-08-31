import React, { useEffect, useState } from "react";
import "../auth.scss";
import Input from "../../../components/HOC/Input";
import HideIcon from "../../../assets/icons/hide.svg";
import ShowIcon from "../../../assets/icons/show.svg";
import { useNavigate } from "react-router-dom";
import { REGISTERUSERDATA } from "../../../Jotai/atomType";
import { useAtom } from "jotai";
import { toast } from "react-hot-toast";

export default function Login() {
  const [registerUserData, setRegisterUserData] = useAtom(REGISTERUSERDATA);
  const [inputValue, setInputValue] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    let pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return pattern.test(email);
  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;
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
    setErrors(error);
    return formIsValid;
  };

  const onLogin = () => {
    if (validateForm()) {
      setLoader(true);
      let user = registerUserData.find(
        (item) => item.email === inputValue.email
      );
      if (user) {
        if (user.password === inputValue.password) {
          localStorage.setItem("task-user-info", JSON.stringify(user));
          navigate("/");
          toast.success("Login successfully");
        } else {
          toast.error("Password does not match.");
        }
      } else {
        toast.error("User not found.");
      }
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="title">
          <h1>Login</h1>
        </div>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={inputValue.password || ""}
          onChange={onhandleChnage}
          icon={showPassword ? ShowIcon : HideIcon}
          onIconClick={onToggleShowPassword}
          errors={errors["password"]}
          isRequired={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onLogin();
            }
          }}
        />
        <div className="button" disabled={loader} onClick={onLogin}>
          <button>Login</button>
        </div>

        <div className="text">
          <span>
            Don't have an account? <a href="/signup">Signup</a>
          </span>
        </div>
      </div>
    </div>
  );
}
