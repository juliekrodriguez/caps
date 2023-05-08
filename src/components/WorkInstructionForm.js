
import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

function WorkInstructionForm({ onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructionText, setInstructionText] = useState("");
  const [instructionCordinates, setInstructionCoordinates] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      title: title,
      description: description,
      instructionList: [
        {
          instructionText: instructionText,
          instructionImage: "",
          instructionCordinates: instructionCordinates,
          itemList: []
        }
      ]
    };
    setTitle("");
    setDescription("");
    setInstructionText("");
    setInstructionCoordinates("");
    setShowForm(false);
    onAdd(payload);
    // send a POST request to add the work instruction
    fetch("https://localhost:7077/api/WorkInstructions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  function handleAddWorkInstruction() {
    setShowForm(true);
  }

  return (
    <div className="work-instruction-form-container">
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddWorkInstruction}
      >
        Add Work Instruction
      </Button>
      {showForm && (
        //adding a work instruciton form
        <form onSubmit={handleSubmit} className="work-instruction-form">
          <Typography variant="h5">Add Work Instruction</Typography>
          <TextField
            label="Title of Work Instruction"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <TextField
            label="Instruction Text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={instructionText}
            onChange={event => setInstructionText(event.target.value)}
          />
          <TextField
            label="Instruction Coordinates"
            variant="outlined"
            fullWidth
            margin="normal"
            value={instructionCordinates}
            onChange={event => setInstructionCoordinates(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default WorkInstructionForm;
