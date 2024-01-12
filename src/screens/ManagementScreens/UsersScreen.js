import { handleServiceDeleteUser } from "../../service/userService";
import { handleServiceGetUsers } from "../../service/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import bancoLogo from "../../assets/images/bancoLogo.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function UsersScreen() {
  var [haveData, setHaveData] = useState(false);
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

  useEffect(() => {
    getUser();
  }, []);

  let getUser = () => {
    handleServiceGetUsers().then((result) => {
      const value = result == undefined ? [] : result;
      const temp = value.map((user, index) => (
        <div key={index}>
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="font-bold">Pseudo: {user.pseudo}</p>
            <p>Email: {user.email}</p>
            <div className="modal">
              <button
                type="button"
                className="font-medium mt-2 bg-red-500 p-2 text-white rounded-lg dark:text-red-500"
                onClick={() => handleDeleteUsers(user.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ));

      setUsersComponents(temp);

      const templist = value.map((user, index) => (
        <tr key={index} className="bg-white dark:bg-gray-800">
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.pseudo}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.email}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            <div className="modal">
              <button
                type="button"
                className="font-medium bg-red-500 p-2 text-white rounded-lg dark:text-red-500"
                onClick={() => handleDeleteUsers(user.id)}
              >
                Supprimer
              </button>
            </div>
          </td>
        </tr>
      ));
      setUsersListComponents(templist);

      setHaveData(true);
    });
  };

  const handleDeleteUsers = (id) => {
    Swal.fire({
      title: "Supprimer",
      text: "Êtes-vous sûr de supprimer cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        setHaveData(false);
        handleServiceDeleteUser(id).then((result) => {
          if (result) {
            Swal.fire({
              title: "Supprimé !",
              text: "Utilisateur supprimé avec succès",
              icon: "success",
            });
          }
          setHaveData(true);
          getUser();
        });
      }
    });
  };

  return (
    <div>
      <div className="p-4 sm:ml-64 text-left">
        <div className="text-left text-2xl text-[#F94C10] font-bold mb-4">
          Liste des utilisateurs
        </div>

        <div className="mb-9">
          <Link to="/signin">
            <button
              type="button"
              className="text-gray-900 mr-3 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
            >
              <FontAwesomeIcon className="mr-2" icon={faPlus} />
              Ajouter un Utilisateur
            </button>
          </Link>
        </div>

        {windowSize.width > 765 ? (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Pseudo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    email
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
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UsersScreen;
