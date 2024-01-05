import {
  faPlus,
  faFilter,
  faPen,
  faDownload,
  faUser,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

import {
  handleServiceSendTicket,
  handleServiceDownloadTicket,
  handleServiceGetStudents,
  handleServiceSendStudentList,
} from "../../service/studentService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import Modal from "react-modal";

function HickerScreen() {
  const handleBaseFunctionForGettingUsers = (data) => {
    handleServiceGetStudents(data).then((result) => {
      const temp = result.map((user, index) => (
        <div key={index}>
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="font-bold">
              Nom: {user.lastName} {user.firstName}
            </p>
            <p>Email: {user.email}</p>
            <p>Classe: {user.class}</p>

            <div className="flex mb-3 mt-2">
              <div
                className={`p-3 flex mr-3 items-center ${
                  user.pass.aCheck ? "bg-green-500" : "bg-red-500"
                } rounded-lg`}
              >
                <p className="font-bold text-white">Arrivé</p>
                <FontAwesomeIcon className="ml-2 text-white" icon={faUser} />
              </div>
              <div
                className={`p-3 flex mr-3 items-center ${
                  user.pass.dCheck ? "bg-green-500" : "bg-red-500"
                } rounded-lg`}
              >
                <p className="font-bold text-white">Est partis</p>
                <FontAwesomeIcon
                  className="ml-2 text-white"
                  icon={faDoorOpen}
                />
              </div>
            </div>

            <div className="flex">
              <button
                type="button"
                onClick={() => GoToNextPage(user)}
                className="text-gray-900 font-semibold mr-3 bg-blue-300 hover:bg-blue-300/90 focus:ring-4 focus:outline-none focus:ring-blue-300/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-300/50"
              >
                Éditer
                <FontAwesomeIcon className="ml-2 text-white" icon={faPen} />
              </button>
              <button
                type="button"
                onClick={() => generateTicket(user.id)}
                className="text-gray-900 font-semibold mr-3 bg-green-300 hover:bg-green-300/90 focus:ring-4 focus:outline-none focus:ring-blue-300/50 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-300/50"
              >
                Envoyer le ticket
              </button>

              <button
                type="button"
                onClick={() => downloadTicket(user.id)}
                className="text-gray-900 mr-3 bg-yellow-300 hover:bg-yellow-300/90 focus:ring-4 focus:outline-none focus:ring-blue-300/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-300/50"
              >
                <FontAwesomeIcon className="text-black" icon={faDownload} />
              </button>
            </div>
          </div>
        </div>
      ));
      setUsersComponents(temp);

      const templist = result.map((user, index) => (
        <tr key={index} className="bg-white dark:bg-gray-800">
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.lastName}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.firstName}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.class}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.email}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.hasPaid ? (
              <p className="bg-green-200 text-green-700 mb-3 py-1 px-2 rounded-xl">
                Payé
              </p>
            ) : (
              <p className="bg-red-200 text-red-700 py-1 mb-3 px-2 rounded-xl">
                Non Payé
              </p>
            )}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </a>
          </td>
        </tr>
      ));
      setUsersListComponents(templist);

      setHaveData(true);
    });
  };

  const navigate = useNavigate();

  var [haveData, setHaveData] = useState(false);
  var [isLoading, setIsLoading] = useState(false);

  const [filterValue, setFilterValue] = useState(1);
  const handleClassChange = (selectedOption) => {
    setFilterValue(selectedOption.label);
  };

  var [usersComponents, setUsersComponents] = useState();
  var [usersListComponents, setUsersListComponents] = useState();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  function GoToNextPage(user) {
    localStorage.setItem("userData", JSON.stringify(user));
    navigate("/ModifyStudentScreen");
  }

  function generateTicket(idUser) {
    setHaveData(false);
    handleServiceSendTicket(idUser).then(() => {
      setHaveData(true);
    });
  }

  function downloadTicket(idUser) {
    setHaveData(false);
    handleServiceDownloadTicket(idUser).then(() => {
      setHaveData(true);
    });
  }

  const handleSendFile = () => {
    setHaveData(false);
    closeModal();

    const fileInput = document.getElementById("excelFileInput");
    const excelFile = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", excelFile);

    handleServiceSendStudentList(formData);
  };

  useEffect(() => {
    handleBaseFunctionForGettingUsers();
  }, []);

  const filterList = [
    {
      value: 1,
      label: "Présent",
    },
    {
      value: 2,
      label: "Partis",
    },
    {
      value: 3,
      label: "Tous",
    },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      paddingRight: "20px",
      width: "90%",
      height: "80%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getOptionLabel = (selectedOption) => {
    const foundOption = filterList.find(
      (option) => option.label === selectedOption
    );
    return foundOption ? foundOption.value : null;
  };

  const handleFilterListUsers = async () => {
    closeModal();
    const selectedFilter = getOptionLabel(filterValue);
    let finalValue = null;
    switch (selectedFilter) {
      case 1:
        finalValue = "a";
      case 2:
        finalValue = "d";
    }
    const data = {
      filter: finalValue,
    };
    handleBaseFunctionForGettingUsers(data);
  };

  return (
    <div>
      <div className="p-4 sm:ml-64 text-left">
        <div className="text-2xl text-[#F94C10] font-bold mb-5">
          Liste des Étudiants
        </div>

        <div id="modal" className="mb-3">
          <button
            type="button"
            onClick={openModal}
            className="text-gray-900 mr-3 mb-3 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
          >
            <FontAwesomeIcon className="mr-2 text-white" icon={faFilter} />
            Paramètres
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="mb-9">
              <p className="font-bold text-lg mb-4">Choisissez votre option</p>
              <Link to="/StudentScreen">
                <button
                  type="button"
                  className="text-gray-900 mr-3 mb-3 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                >
                  <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  Ajouter un Étudiant
                </button>
              </Link>

              <div className="mb-4 pl-4">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Importer une liste
                </label>
                <input
                  class="block w-full text-left text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="excelFileInput"
                  type="file"
                />
              </div>

              {!isLoading ? (
                <button
                  type="submit"
                  onClick={handleSendFile}
                  className="text-white mb-3 text-gray-500 bg-[#F94C10] focus:ring-4 focus:outline-none focus:ring-[#F94C10]/70 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ajouter
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

              <div className="mb-5 flex">
                <Select
                  name="category"
                  placeholder="Choisissez"
                  isSearchable={false}
                  options={filterList}
                  onChange={handleClassChange}
                  value={filterList.find(
                    (option) => option.value === filterValue
                  )}
                  className="react-select-container mr-4"
                />
                <button
                  type="button"
                  onClick={handleFilterListUsers}
                  className="text-gray-900 mr-3 mb-3 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                >
                  Filtrer
                  <FontAwesomeIcon
                    className="ml-2 text-black"
                    icon={faFilter}
                  />
                </button>
              </div>

              <form className="max-w-sm">
                <div className="mb-5">
                  <input
                    type="text"
                    id="nom"
                    className="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Recherchez..."
                    required
                  />
                </div>
              </form>
            </div>
          </Modal>
        </div>

        {windowSize.width > 500 ? (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prénom
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Classe
                  </th>
                  <th scope="col" className="px-6 py-3">
                    email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ticket
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{usersListComponents}</tbody>
            </table>
          </div>
        ) : (
          usersComponents
        )}

        {!haveData ? (
          <div
            role="status"
            class="absolute h-screen w-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80 opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HickerScreen;
