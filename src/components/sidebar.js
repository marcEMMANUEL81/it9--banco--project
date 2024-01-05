import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleServiceLogOut } from "../service/authService";
import bancoLogo from "../assets/images/bancoLogo.png";
import {
  faUsers,
  faCampground,
  faQrcode,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="text-left lg:text-sm text-md pb-2">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-4 h-4 mr-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
        <p className="font-bold">IT9 BANCO</p>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="mb-6 flex items-center">
            <img
              className="h-9 w-9"
              src={bancoLogo}
              alt="Description of the image"
            />
            <p className="font-bold text-lg">IT9 Banco</p>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/UsersScreen"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faUsers} />
                <span className="ms-3">Utilisateurs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/HickerScreen"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faCampground} />
                <span className="ms-3">Randonneurs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ScannerScreen"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faQrcode} />
                <span className="flex-1 ms-3 whitespace-nowrap">Scanner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/TicketCard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faTicket} />
                <span className="flex-1 ms-3 whitespace-nowrap">Ticket</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => handleServiceLogOut()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Se déconnecter
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
