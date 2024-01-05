import { successNotify } from "../notification/notify";
import { waringNotify } from "../notification/notify";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("SESSION_TOKEN");

const apiUrl = "https://it9-banco-backend.onrender.com/api";

// Function to sign user
export const handleServiceScanTicket = async (data) => {
  try {
    const uri = `${apiUrl}/pass/scan`;
    const response = await axios.post(uri, data);
    console.log(response);
    const status = response.data.status;

    switch (status) {
      case true:
        successNotify(response.data.message);
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