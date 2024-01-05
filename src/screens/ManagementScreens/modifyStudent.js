import { handleServiceSetStudent } from "../../service/studentService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

  const getOptionValue = (selectedOption) => {
    const foundOption = listClassroom.find(
      (option) => option.label === selectedOption
    );
    return foundOption ? foundOption.value : null;
  };

  const getOptionLabel = (selectedOption) => {
    const foundOption = listClassroom.find(
      (option) => option.value === selectedOption
    );
    return foundOption ? foundOption.label : null;
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

  const [classValue, setClassValue] = useState(1);
  const handleClassChange = (selectedOption) => {
    setClassValue(selectedOption.label);
    handleButtonStyle(
      lastnameValue,
      firstnameValue,
      emailValue,
      selectedOption.label
    );
  };

  const handleLogin = () => {
    setIsLoading(true);
    const selectedClass = getOptionLabel(classValue);

    const userInfo = {
      studentId: JSON.parse(localStorage.getItem("userData")).id,
      lastName: lastnameValue,
      firstName: firstnameValue,
      email: emailValue,
      class: selectedClass,
    };

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
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Patientez...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModifyStudentScreen;
