/*
WorkInstructionEditor.js would be the main component that handles rendering the other 
components based on user interactions. 

WorkInstructionEditor.js, you could use state to keep track of the current work instruction 
being edited, and pass this data down to the other components as props. You would also define 
functions to update this state and make API calls to the backend.
*/

/* 
onUpdate prop to WorkInstructionEditor that takes a function as a value 
*/

import React, { useState } from "react";
import {fetchWorkInstructions } from "../services/api"

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Col, // Add Col component
  Row, // Add Row component
} from "reactstrap";

const WorkInstructionEditor = ({ workInstruction, onUpdate }) => {
  const [title, setTitle] = useState(workInstruction.title);
  const [description, setDescription] = useState(workInstruction.description);
  const [instructionList, setInstructionList] = useState(
    workInstruction.instructionList
  );
  const [instructionCoords, setInstructionCoords] = useState(
    workInstruction.instructionList?.map(
      (instruction) => instruction.instructionCordinates || ""
    )
  );

  workInstruction.instructionList.forEach((instruction) => {
    instruction.itemList.forEach((item) => {
      // Access the properties of the item
      const itemId = item.itemId;
      const itemName = item.item.name;
      const itemQuantity = item.itemQuantity;
      console.log("itemid:", itemId);
      console.log("itemname:", itemName);
      console.log("itemquant:", itemQuantity);
      // You can use these properties to delete the item if needed
      // For example, you can make an API call to delete the item by ID
      // fetch(`https://localhost:7077/api/items/${itemId}`, {
      //   method: 'DELETE',
      // })
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch(error => console.error(error));
    });
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  //onChange={(e) => setTitle(t.target.value)}
  const handleInstructionTextChange = (index, e) => {
    const newList = [...instructionList];
    newList[index].instructionText = e.target.value;
    setInstructionList(newList);
  };

  const handleInstructionCoordsChange = (index, e) => {
    const newCoords = [...instructionCoords];
    newCoords[index] = e.target.value;
    setInstructionCoords(newCoords);

    const newList = [...instructionList];
    newList[index].instructionCordinates = e.target.value;
    setInstructionList(newList);
  };

  const handleSaveClick = () => {
    onUpdate({
      ...workInstruction,
      title: title,
      description: description,
      instructionList: instructionList,
    });

    setIsEditing(false);

    fetch(`https://localhost:7077/api/WorkInstructions/${workInstruction.id}`, {
      //use to be put
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,

        instructionList: instructionList.map((instruction, index) => ({
          ...instruction,
          instructionCordinates: instructionCoords[index],
        })),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };


  

  const handleEditClick = () => {
    console.log("handle edit click called")
    setIsEditing(true);
  };
  console.log("here is my WI:",workInstruction)

  return (
    <div>
      {isEditing ? (
        <div>
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <Label for="title">Title:</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description:</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                  />
                </FormGroup>
                {instructionList.map((instruction, index) => (
                  <div key={index}>
                    <FormGroup>
                      <Label for={`instructionText${index}`}>
                        Instruction {index + 1} Text:
                      </Label>
                      <Input
                        type="textarea"
                        name={`instructionText${index}`}
                        id={`instructionText${index}`}
                        value={instruction.instructionText}
                        onChange={(e) => handleInstructionTextChange(index, e)}
                        placeholder="Enter instruction text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Instruction {index + 1} Coordinates:</Label>
                      <Input
                        type="text"
                        value={instructionCoords[index]}
                        onChange={(e) => handleInstructionCoordsChange(index, e)}
                      />
                    </FormGroup>

                    <Label>Items:</Label>
                    <ListGroup>
                      {instruction.itemList.map((item) => (
                        <ListGroupItem key={item.itemId}>
                          {item.itemQuantity} x {item.item.name}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                ))}
              </Form>
            </Col>
            <Col xs="auto"> {/* Add a column for the buttons */}
              <Button color="primary" onClick={handleSaveClick}>
                Save
              </Button>
              <Button color="secondary" onClick={handleEditClick}>
                Edit
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <Button color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkInstructionEditor;
