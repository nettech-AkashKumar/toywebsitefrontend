import React from 'react';
import "./progressbar.css";

const ProgressBar = ({ status }) => {
  const statues = ["Order Placed", "Processing", "Shipped", "Delivered"]
  //get index of current status
  const currentstep = statues.indexOf(status)
  return (
    <div className='progress-container'>
      <ul id="progress" >
        {statues.map((step, index) => (
          <li key={step} className={`progresslist ${index <= currentstep ? 'active-step' : ''}`}  ><p className={`delivery   deliverytext ${step.toLowerCase().replace(" ", "-")}`}>{step}</p></li>
        ))}
      </ul>
      <div className='milestone-bar'><p className="milestone-text">{status}</p></div>

    </div >




  )
}

export default ProgressBar

// import React from 'react';
// import "./progressbar.css";

// const ProgressBar = ({ status }) => {
//   const statuses = ["Order Placed", "Processing", "Shipped", "Delivered"];
//   const currentStep = statuses.indexOf(status);

//   return (
//     <div className='progress-container'>
//       <ul id="progress">
//   {statuses.map((step, index) => (
//     <li
//       key={step}
//       className={`progresslist ${
//         index < currentStep
//           ? 'completed-step'
//           : index === currentStep
//           ? 'active-step'
//           : ''
//       }`}
//     >
//       <p className={`delivery deliverytext ${step.toLowerCase().replace(" ", "-")}`}>
//         {step}
//       </p>
//     </li>
//   ))}
// </ul>
//       <div className='milestone-bar'>
//         <p className="milestone-text">{status}</p>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;
