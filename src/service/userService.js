import { successNotify } from "../notification/notify";
import { waringNotify } from "../notification/notify";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("SESSION_TOKEN");

const apiUrl = "https://it9-banco-backend.onrender.com/api";

// Function to log users
export const handleServiceGetUsers = async () => {
  try {
    const uri = `${apiUrl}/auth/all`;
    const response = await axios.get(uri);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        return response.data.data;
      case false:
        waringNotify(response.data.message);
        break;
    }
  } catch (error) {
    waringNotify("Quelque chose a mal tourné");
    console.log("Error posting data:", error);
  }
};

// Function to sign user
export const handleServiceSignUser = async (data) => {
  try {
    const uri = `${apiUrl}/auth/seed`;
    const response = await axios.post(uri, data);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("Utilisateur crée avec succès");
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
export const handleServiceLogOutUsers = async () => {
  try {
    const uri = `${apiUrl}/auth/logout`;
    const response = await axios.get(uri);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("Déconnexion reussie");
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

export const handleServiceDeleteUser = async (id) => {
  try {
    const uri = `${apiUrl}/auth/delete/${id}`;
    const response = await axios.delete(uri);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("Utilisateur supprimé avec succès 🥳");
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
