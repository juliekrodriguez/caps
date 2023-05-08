import React from 'react'
import axios from 'axios';

//workInstruction object and a onDelete function as props.
export const WorkInstructionDelete = ({ workInstruction, onDelete }) => {
    
    //delete the specific work instruction object that the user clicked on.
    const handleDeleteClick = () => {
        console.log(workInstruction)
        onDelete(workInstruction.id);

        axios.delete(`https://localhost:7077/api/WorkInstructions/${workInstruction.id}`)
        .then(response => {
            console.log(response);
            console.log('delete was ok')
        })
        .catch(error => {
            console.log(error);
        });

        // delete the work instruction from local storage
  const existingWorkInstructions = JSON.parse(localStorage.getItem('workInstructions')) || [];
  const updatedWorkInstructions = existingWorkInstructions.filter((item) => item.id !== workInstruction.id);
  localStorage.setItem('workInstructions', JSON.stringify(updatedWorkInstructions));
      };
  
    return (
        <button onClick={handleDeleteClick}>Delete</button>
  )
};
export default WorkInstructionDelete;
