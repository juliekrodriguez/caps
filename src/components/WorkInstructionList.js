/*WorkInstructionList.js would handle rendering a list of work instructions*/
import React, { useState, useEffect } from 'react';
import { fetchWorkInstructions } from '../services/api';
import WorkInstructionForm from './WorkInstructionForm';
import WorkInstructionEditor from './WorkInstructionEditor';
import WorkInstructionDelete from './WorkInstructionDelete';

import { Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap';

import "./styles.css";

//takes a prop called "workInstructions", 
//which is an array of work instruction objects that contain a title, 
//description, and a list of instructions.

const WorkInstructionList = ({workInstructions, onUpdate, onDelete}) => {
  console.log(workInstructions)

  if (workInstructions.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="work-instruction-list">
        {workInstructions.map((workInstruction, i) => (
          <div key={i} className="work-instruction-item my-custom-class">
            <h2>{workInstruction.title}</h2>
            <p>{workInstruction.description}</p>
            <WorkInstructionEditor workInstruction={workInstruction} onUpdate={onUpdate} />
            <WorkInstructionDelete workInstruction={workInstruction} onDelete={onDelete} />
          </div>        
        ))}
      </div>
    </div>
  );
};

export default WorkInstructionList;


