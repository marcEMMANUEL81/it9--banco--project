// import codeqr from "../../assets/images/codeqr.png";
// import ticket from "../../assets/images/ticket.png";
// import React, { useEffect, useState } from "react";

// function TicketCard() {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//       console.log(
//         "La page a été redimensionnée ! Nouvelle taille :",
//         windowSize
//       );
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [windowSize]);

//   return (
//     <div>
//       <div className="p-4 sm:ml-64 text-left">
//         <div className="text-left text-2xl text-[#F94C10] font-bold mb-4">
//           Modèle de ticket
//         </div>

//         {windowSize > 600 ? (
//           <div className="relative">
//             <img
//               className="h-[450px]"
//               src={ticket}
//               alt="Description of the image"
//             />
//             <div className="absolute left-1/3 top-36">
//               <p className="font-bold text-white text-3xl mb-6">
//                 BROU YAO MARC-EMMANUEL
//               </p>
//               <p className="font-bold text-white text-3xl mb-6">
//                 07 97 67 45 76
//               </p>
//               <p className="font-bold text-white text-3xl mb-6">
//                 Master 1 Informatique
//               </p>
//             </div>

//             <img
//               className="h-[210px] absolute top-[120px] left-12 pr-2"
//               src={codeqr}
//               alt="Description of the image"
//             />
//           </div>
//         ) : (
//           <div className="relative">
//             <img
//               className="h-[155px]"
//               src={ticket}
//               alt="Description of the image"
//             />
//             <div className="absolute left-[116px] top-[42px]">
//               <p className="font-bold text-white text-[12px] mb-2">
//                 BROU YAO MARC-EMMANUEL
//               </p>
//               <p className="font-bold text-white text-[12px] mb-2">
//                 07 97 67 45 76
//               </p>
//               <p className="font-bold text-white text-[12px] mb-2">
//                 Master 1 Informatique
//               </p>
//             </div>

//             <img
//               className="h-[80px] absolute top-[37px] left-3 pr-2"
//               src={codeqr}
//               alt="Description of the image"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TicketCard;
