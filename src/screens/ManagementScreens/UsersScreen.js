import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleServiceGetUsers } from "../../service/userService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    handleServiceGetUsers().then((result) => {
      const temp = result.map((user, index) => (
        <div key={index}>
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="font-bold">Pseudo: {user.pseudo}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      ));
      setUsersComponents(temp);

      const templist = result.map((user, index) => (
        <tr key={index} className="bg-white dark:bg-gray-800">
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.pseudo}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {user.email}
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
  }, []);

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

export default UsersScreen;
