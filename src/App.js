import React, { useState, useEffect } from "react";
import WorkInstructionList from "./components/WorkInstructionList";
import WorkInstructionForm from "./components/WorkInstructionForm";
import WorkInstructionEditor from "./components/WorkInstructionEditor";
import { fetchWorkInstructions } from "./services/api";
import "./components/styles.css";

export const App = () => {
  const [workInstructions, setWorkInstructions] = useState([]);
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  const fetchData = async () => {
    const data = await fetchWorkInstructions();
    console.log("log data WI from app.js:",data.workInstructions);
    setWorkInstructions(data.workInstructions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleAddWorkInstruction(workInstruction) {
    setWorkInstructions([...workInstructions, workInstruction]);
  }

  function handleUpdateWorkInstruction(updatedWorkInstruction) 
  {
    const updatedWorkInstructions = workInstructions.map((workInstruction) => {
      if (workInstruction.id === updatedWorkInstruction.id) {
        return updatedWorkInstruction;
      } else {
        return workInstruction;
      }
    });
    setWorkInstructions(updatedWorkInstructions);
    setSelectedInstruction(null);
    
  }

  function handleDeleteWorkInstruction(id) {
    setWorkInstructions(
      workInstructions.filter(
        (workInstruction) => workInstruction.id !== id
      )
    );
  }

  function handleEditWorkInstruction(instruction) {
    setSelectedInstruction(instruction);
  }

  function handleCancelEdit() {
    setSelectedInstruction(null);
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        <h2>Work Instruction List</h2>
        <WorkInstructionList
          workInstructions={workInstructions}
          onEdit={handleEditWorkInstruction}
          onDelete={handleDeleteWorkInstruction}
          onUpdate={handleUpdateWorkInstruction}
        />
      </div>
      <div className="right-panel">
        {selectedInstruction ? (
          <WorkInstructionEditor
            instruction={selectedInstruction}
            onSave={handleUpdateWorkInstruction}
            onCancel={handleCancelEdit}
          />
        ) : (
          <WorkInstructionForm onAdd={handleAddWorkInstruction} />
        )}
      </div>
    </div>
  );
};
