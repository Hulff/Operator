import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "./button";
import LinkButton from "./linkButton";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import img from "../imgs/user-svgrepo-com.svg";
const Login = ({ code, setCode }) => {
  useEffect(() => {
    document.getElementById("logoImg").style.opacity = 1;
  }, []);
  const navigate = useNavigate();
  const codeInputData = useRef("");
  function goToList() {
    setCode(codeInputData);
    // autenticar com o db e puxar os dados

    // navigate(`/Options`);
    navigate(`/Spark`);
  }
  return (
    <>
      <div className="container-login">
        <div className="container-login-logo">
          <img id="logoImg" alt="logo-img" src={img} />
          <h1 className="h1-first-load" id="h1Login">Operator</h1>
        </div>
        <input
          type="password"
          name="senha"
          placeholder="Coloque sua senha"
          className="container-login-input"
          ref={codeInputData}
        ></input>
        <Button classes={"login-button"} func={goToList}>
          Entrar
        </Button>
        <LinkButton>Não tem uma conta? clique aqui!</LinkButton>
      </div>
    </>
  );
};

export default Login;
