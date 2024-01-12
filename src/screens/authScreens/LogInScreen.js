import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleServiceLogIn } from "../../service/authService";
import bancoLogo from "../../assets/images/bancoLogo.png";

function LogInScreen() {
  const [isReady, setIsReady] = useState(false);
  const handleButtonStyle = (email, password) => {
    email === "" || password === "" ? setIsReady(false) : setIsReady(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    handleButtonStyle(event.target.value, passwordValue);
  };

  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
    handleButtonStyle(emailValue, event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const userInfo = {
      email: emailValue,
      password: passwordValue,
    };

    await handleServiceLogIn(userInfo).then((result) => {
      setTimeout(() => {
        if (result) {
          navigate("/UsersScreen");
        }
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <div className="p-4 h-screen w-screen flex flex-col justify-center">
      <p className="font-bold text-center text-2xl mb-9">Connection</p>

      <form className="max-w-sm w-full mx-auto">
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Votre email
          </label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={handleEmailChange}
            className="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-8">
          <label
            for="password"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={handlePasswordChange}
            className="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {!isLoading ? (
          <button
            type="submit"
            onClick={handleLogin}
            disabled={!isReady}
            className={`${isReady ? "text-white" : "text-gray-500"} ${
              isReady ? "bg-[#F94C10]" : "bg-gray-200"
            } focus:ring-4 focus:outline-none focus:ring-[#F94C10]/70 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Se connecter
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="text-white bg-[#F94C10]/70 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <div
              role="status"
              class="absolute h-screen w-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80 opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <img
                className="h-[100px] w-[100px] animate-bounce"
                src={bancoLogo}
              />
              <span class="sr-only">Loading...</span>
            </div>
            Patientez...
          </button>
        )}
      </form>
    </div>
  );
}

export default LogInScreen;
