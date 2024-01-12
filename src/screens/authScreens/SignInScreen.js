import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleServiceSignUser } from "../../service/userService";
import bancoLogo from '../../assets/images/bancoLogo.png'


function SignInScreen() {
  const [isReady, setIsReady] = useState(false);
  const handleButtonStyle = (pseudo, email, password) => {
    pseudo === "" || email === "" || password === ""
      ? setIsReady(false)
      : setIsReady(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [pseudoValue, setPseudoValue] = useState("");
  const handlePseudoChange = (event) => {
    setPseudoValue(event.target.value);
    handleButtonStyle(event.target.value, emailValue, passwordValue);
  };

  const [emailValue, setEmailValue] = useState("");
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    handleButtonStyle(pseudoValue, event.target.value, passwordValue);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
    handleButtonStyle(pseudoValue, emailValue, event.target.value);
  };

  const handleLogin = () => {
    setIsLoading(true);

    const userInfo = {
      pseudo: pseudoValue,
      email: emailValue,
      password: passwordValue,
    };

    handleServiceSignUser(userInfo).then((result) => {
      setIsLoading(false);

      if (result) {
        navigate("/UsersScreen");
      }
    });
  };

  return (
    <div className="p-4">
      <p className="font-bold md:text-center text-2xl mb-9">
        Ajouter un utilisateur
      </p>
      <form class="max-w-sm w-full mx-auto">
        <div class="mb-5">
          <label
            for="pseudo"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Votre pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            onChange={handlePseudoChange}
            value={pseudoValue}
            class="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="brou"
            required
          />
        </div>
        <div class="mb-8">
          <label
            for="email"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Votre email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            value={emailValue}
            class="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="marc@gmail.com"
            required
          />
        </div>
        <div class="mb-8">
          <label
            for="password"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={passwordValue}
            class="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            Ajouter
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

export default SignInScreen;
