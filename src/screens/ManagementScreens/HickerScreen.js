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
import bancoLogo from '../../assets/images/bancoLogo.png'
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
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
            {user.lastName}
          </td>
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
            {user.firstName}
          </td>
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
            {user.class}
          </td>
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
            {user.email}
          </td>
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
            <div className="flex mt-2">
              <div
                className={`p-2 flex mr-3 items-center ${
                  user.pass.aCheck ? "bg-green-500" : "bg-red-500"
                } rounded-lg`}
              >
                <p className="font-bold text-white">Arrivé</p>
                <FontAwesomeIcon className="ml-2 text-white" icon={faUser} />
              </div>
              <div
                className={`p-2 flex mr-3 items-center ${
                  user.pass.dCheck ? "bg-green-500" : "bg-red-500"
                } rounded-lg`}
              >
                <p className="font-bold text-white">Partis</p>
                <FontAwesomeIcon
                  className="ml-2 text-white"
                  icon={faDoorOpen}
                />
              </div>
            </div>
          </td>
          <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
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
                Envoyer
              </button>

              <button
                type="button"
                onClick={() => downloadTicket(user.id)}
                className="text-gray-900 mr-3 bg-yellow-300 hover:bg-yellow-300/90 focus:ring-4 focus:outline-none focus:ring-blue-300/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-300/50"
              >
                <FontAwesomeIcon className="text-black" icon={faDownload} />
              </button>
            </div>
          </td>
        </tr>
      ));
      setUsersListComponents(templist);

      setHaveData(true);
    });
  };

  const navigate = useNavigate();

  var [haveData, setHaveData] = useState(false);
  var [isLoading] = useState(false);

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
    setTimeout(() => {
      handleBaseFunctionForGettingUsers();
    }, 2000);
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
      right: "50%%",
      bottom: "auto",
      marginRight: "-70%",
      paddingRight: "20px",
      width: "95vw",
      height: "80%",
      transform: "translate(-50%, -50%)",
      zIndex: "999",
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
            <div className="mb-9 flex flex-col justify-end items-center">
              <p className="font-bold text-lg mb-4">Choisissez votre option</p>
              <Link to="/StudentScreen">
                <button
                  type="button"
                  className="text-gray-900 mr-3 mb-9 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                >
                  <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  Ajouter un Étudiant
                </button>
              </Link>

              <div className="mb-4 w-lg pl-4">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Importer une liste
                </label>
                <input
                  class="block text-left text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="excelFileInput"
                  type="file"
                />
              </div>

              {!isLoading ? (
                <button
                  type="submit"
                  onClick={handleSendFile}
                  className="text-white mb-9 text-gray-500 bg-[#F94C10] focus:ring-4 focus:outline-none focus:ring-[#F94C10]/70 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <img className="h-[100px] w-[100px] animate-bounce" src={bancoLogo} />
            <span class="sr-only">Loading...</span>
          </div>
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
                    Status
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
            <img className="h-[100px] w-[100px] animate-bounce" src={bancoLogo} />
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HickerScreen;
