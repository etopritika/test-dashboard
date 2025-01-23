"use client";
import React, { useState } from "react";
import LoginForm from "./Login-Form";
import RegisterForm from "./Register-Form";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      {isLogin ? (
        <LoginForm onSwitchToRegister={toggleForm} />
      ) : (
        <RegisterForm onSwitchToLogin={toggleForm} />
      )}
    </>
  );
};

export default AuthForm;
