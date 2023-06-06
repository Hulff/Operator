import React, { useState, useEffect, useRef, useContext } from "react";
import { useCookies } from "react-cookie";
import Button from "./button";
import LinkButton from "./linkButton";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import img from "../imgs/user-svgrepo-com.svg";
import { getCodeData, writeCodeData } from "../services/firebase";
const Login = ({ code, setCode, setData,setCabinsList }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["code"]);
  useEffect(() => {
    document.getElementById("logoImg").style.opacity = 1;
  }, []);
  const navigate = useNavigate();
  const codeInputData = useRef("");
  function goToList() {
    setCode(codeInputData.current.value);
    setCookie("code",codeInputData.current.value)
    const getData = async () => {
      try {
        const data = await getCodeData(codeInputData.current.value);
        console.log(data);
        if (data == null) {
          codeInputData.current.placeholder = "Essa senha não existe";
          codeInputData.current.value = "";
          return;
        }
        setData(data);
        setCabinsList(data.cabinOrder)
        navigate(`/Options`);
      } catch (error) {
        console.error(error);
      }
    };
    if (codeInputData.current.value !== "") {
      getData();
    } else {
      codeInputData.current.placeholder = "Você precisa colocar a senha";
    }
  }
  return (
    <>
      <div className="container-login">
        <div className="container-login-logo">
          <img id="logoImg" alt="logo-img" src={img} />
          <h1 className="h1-first-load" id="h1Login">
            Operator
          </h1>
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
