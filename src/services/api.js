import axios from "axios";

const API_BASE_URL = "https://localhost:7077/api/WorkInstructions"; // This is the base URL for your API, replace it with your API's URL.

// This function fetches all work instructions from the API.
export const fetchWorkInstructions = async () => {
  console.log("Fetching work instructions...");
  const response = await axios.get(`${API_BASE_URL}`);
  
  return response.data; // The response.data is returned from the function.
};

// This function creates a new work instruction in the API.
export const createWorkInstruction = async (workInstruction) => {
  const response = await axios.post(`${API_BASE_URL}`, workInstruction);
  return response.data; // The newly created work instruction is returned from the function.
};

// This function updates an existing work instruction in the API.
export const updateWorkInstruction = async (id, workInstruction) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, workInstruction);
  return response.data; // The updated work instruction is returned from the function.
};

// This function deletes an existing work instruction from the API.
export const deleteWorkInstruction = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data; // The deleted work instruction is returned from the function.
};
