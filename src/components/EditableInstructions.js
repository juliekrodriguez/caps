// import React, { useState } from "react";

// function EditableInstructions({ title, description, instructionList }) {
//   const [instructions, setInstructions] = useState(instructionList);

//   const handleInstructionChange = (index, field, value) => {
//     const newInstructions = [...instructions];
//     newInstructions[index][field] = value;
//     setInstructions(newInstructions);
//   };

//   const handleDeleteInstruction = (index) => {
//     const newInstructions = [...instructions];
//     newInstructions.splice(index, 1);
//     setInstructions(newInstructions);
//   };

//   const handleAddInstruction = () => {
//     const newInstruction = {
//       instructionId: instructions.length + 1,
//       instructionText: "",
//       instructionImage: "",
//       instructionCoordinates: "",
//       instructionForeignKey: 1
//     };
//     setInstructions([...instructions, newInstruction]);
//   };

//   return (
//     <div>
//       <h1>{title}</h1>
//       <p>{description}</p>
//       <ol>
//         {instructions.map((instruction, index) => (
//           <li key={instruction.instructionId}>
//             <input
//               type="text"
//               value={instruction.instructionText}
//               onChange={(e) =>
//                 handleInstructionChange(
//                   index,
//                   "instructionText",
//                   e.target.value
//                 )
//               }
//             />
//             <input
//               type="text"
//               value={instruction.instructionImage}
//               onChange={(e) =>
//                 handleInstructionChange(
//                   index,
//                   "instructionImage",
//                   e.target.value
//                 )
//               }
//             />
//             <input
//               type="text"
//               value={instruction.instructionCoordinates}
//               onChange={(e) =>
//                 handleInstructionChange(
//                   index,
//                   "instructionCoordinates",
//                   e.target.value
//                 )
//               }
//             />
//             <button onClick={() => handleDeleteInstruction(index)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ol>
//       <button onClick={handleAddInstruction}>Add Instruction</button>
//     </div>
//   );
// }

// export default EditableInstructions;

