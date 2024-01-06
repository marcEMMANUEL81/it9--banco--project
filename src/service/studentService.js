import { successNotify } from "../notification/notify";
import { waringNotify } from "../notification/notify";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("SESSION_TOKEN");

const apiUrl = "https://it9-banco-backend.onrender.com/api";

// Function to sign user
export const handleServiceSignstudent = async (data) => {
  try {
    const uri = `${apiUrl}/student/store`;
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

export const handleServiceGetStudents = async (data) => {
  try {
    const uri = `${apiUrl}/student/all`;
    const response = await axios.post(uri, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SESSION_TOKEN"),
      },
    });
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

// filter

export const handleServiceFilterStudents = async () => {
  try {
    const uri = `${apiUrl}/student/all`;
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

export const handleServiceSetStudent = async (data) => {
  try {
    const uri = `${apiUrl}/student/update`;
    const response = await axios.post(uri, data);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("Utilisateur modifié avec succès");
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

export const handleServiceSendTicket = async (id) => {
  try {
    const uri = `${apiUrl}/pass/send/${id}`;
    const response = await axios.get(uri);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("Ticket Envoyé avec succès");
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

export const handleServiceDownloadTicket = async (id) => {
  try {
    const uri = `${apiUrl}/pass/download/${id}`;
    window.open(uri, "_blank");
    return true;
  } catch (error) {
    waringNotify("Quelque chose a mal tourné");
    console.log("Error posting data:", error);
  }
};

// Function to sign user
export const handleServiceSendStudentList = async (data) => {
  try {
    const uri = `${apiUrl}/student/import-file`;
    const response = await axios.post(uri, data);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify("La liste a bien été envoyée");
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
