import { handleServiceSetStudent } from "../../service/studentService";
import { useNavigate, useLocation } from "react-router-dom";
import bancoLogo from "../../assets/images/bancoLogo.png"
import React, { useEffect, useState } from "react";
import Select from "react-select";

function ModifyStudentScreen() {
  const location = useLocation();

  useEffect(() => {
    const receivedData = JSON.parse(localStorage.getItem("userData"));

    if (receivedData) {
      setLastnameValue(receivedData.lastName);
      setFirstnameValue(receivedData.firstName);
      setEmailValue(receivedData.email);
      const value = getOptionValue(receivedData.class);
      setClassValue(value);
    }
  }, [location.state]);

  const getOptionLabel = (selectedOption) => {
    const foundOption = listClassroom.find(
      (option) => option.value === selectedOption
    );
    return foundOption ? foundOption.label : null;
  };

  const getOptionValue = (selectedOption) => {
    const foundOption = listClassroom.find(
      (option) => option.label === selectedOption
    );
    return foundOption ? foundOption.value : null;
  };

  const [isReady, setIsReady] = useState(false);
  const handleButtonStyle = (lastname, firstname, email, classroom) => {
    lastname === "" || firstname === "" || email === "" || classroom === ""
      ? setIsReady(false)
      : setIsReady(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [lastnameValue, setLastnameValue] = useState("");
  const handleLastnameChange = (event) => {
    setLastnameValue(event.target.value);
    handleButtonStyle(
      event.target.value,
      firstnameValue,
      emailValue,
      classValue
    );
  };

  const [firstnameValue, setFirstnameValue] = useState("");
  const handleFirstnameChange = (event) => {
    setFirstnameValue(event.target.value);
    handleButtonStyle(
      lastnameValue,
      event.target.value,
      emailValue,
      classValue
    );
  };

  const [emailValue, setEmailValue] = useState("");
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    handleButtonStyle(
      lastnameValue,
      firstnameValue,
      event.target.value,
      classValue
    );
  };

  const [classValue, setClassValue] = useState(null);
  const handleClassChange = (selectedOption) => {
    setClassValue(selectedOption.value);
    handleButtonStyle(
      lastnameValue,
      firstnameValue,
      emailValue,
      selectedOption.label
    );
  };

  const handleLogin = () => {
    setIsLoading(true);
    console.log(classValue);
    const selectedClass = getOptionLabel(classValue);

    const userInfo = {
      studentId: JSON.parse(localStorage.getItem("userData")).id,
      lastName: lastnameValue,
      firstName: firstnameValue,
      email: emailValue,
      class: selectedClass,
    };

    console.log(userInfo);

    handleServiceSetStudent(userInfo).then((result) => {
      setIsLoading(false);

      if (result) {
        navigate("/HickerScreen");
      }
    });
  };

  const listClassroom = [
    {
      value: 1,
      label: "Master I Informatique",
    },
    {
      value: 2,
      label: "Master I Réseaux Télecommunications",
    },
    {
      value: 3,
      label: "Master I BIHAR",
    },
    {
      value: 4,
      label: "Master I MDSI",
    },
  ];

  return (
    <div className="">
      <div className="p-4 flex flex-col">
        <div className="text-2xl text-left text-[#F94C10] font-bold mb-4">
          Modifier un étudiant
        </div>

        <form className="max-w-sm w-full mx-auto">
          <div className="mb-5">
            <label
              for="nom"
              className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Nom
            </label>
            <input
              type="text"
              id="nom"
              value={lastnameValue}
              onChange={handleLastnameChange}
              className="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="brou"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="prenom"
              className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Prenom
            </label>
            <input
              type="text"
              id="prenom"
              value={firstnameValue}
              onChange={handleFirstnameChange}
              className="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="yao marc"
              required
            />
          </div>
          <label
            for="classe"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Classe
          </label>
          <div className="mb-5">
            <Select
              name="category"
              value={listClassroom.find(
                (option) => option.value === classValue
              )}
              onChange={handleClassChange}
              options={listClassroom}
              className="react-select-container text-left font-bold"
            />
          </div>
          <div className="mb-8">
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
              placeholder="marc@gmail.com"
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
              Modifier
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
            <img className="h-[100px] w-[100px] animate-bounce" src={bancoLogo} />
            <span class="sr-only">Loading...</span>
          </div>
              Patientez...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModifyStudentScreen;
