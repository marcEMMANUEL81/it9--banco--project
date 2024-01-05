import { successNotify } from "../notification/notify";
import { waringNotify } from "../notification/notify";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("SESSION_TOKEN");

const apiUrl = "https://it9-banco-backend.onrender.com/api";

// Function to log users
export const handleServiceLogIn = async (data) => {
  try {
    const uri = `${apiUrl}/auth/login`;
    const response = await axios.post(uri, data);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        localStorage.setItem("SESSION_TOKEN", response.data.token);
        successNotify("Connexion reussie 🥳");
        return true;
      case false:
        waringNotify(response.data.message);
        break;
    }
  } catch (error) {
    waringNotify("Quelque chose a mal tourné");
    console.log("Error posting data:", error);
  }
};

// Function to log users
export const handleServiceLogOut = async () => {
  try {
    const uri = `${apiUrl}/auth/logout`;
    console.log(uri);
    const response = await axios.get(uri);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        localStorage.setItem(
          "SESSION_TOKEN",
          JSON.stringify(response.data.token)
        );
        successNotify("Deconnexion reussie 🥳");
        return true;
      case false:
        waringNotify(response.data.message);
        break;
    }
  } catch (error) {
    waringNotify("Quelque chose a mal tourné");
    console.log("Error posting data:", error);
  }
};
