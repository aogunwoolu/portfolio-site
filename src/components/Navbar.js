import { Link } from 'gatsby';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

// export default function Navbar() {
//   return (
//   <nav className='mynav'>
//     <h1></h1>
//     <div className="links">
//         <Link to="#startPage">Home</Link>
//         <Link to="#radar">About</Link>
//         <Link to="#projects">Projects</Link>
//         <Link to="/">Resume</Link>
//     </div>
//   </nav>
//   )
// }

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className='mynav'>
      <h1></h1>
      <div className={`hidden md:mx-8 md:block md:flex md:justify-end`}>
        <Link to="#startPage">Home</Link>
        <Link to="#radar">About</Link>
        <Link to="#projects">Projects</Link>
        <Link to="/">Resume</Link>
      </div>
      <div className='md:hidden mx-8 mt-4 block flex justify-end burger' onClick={toggleMenu}>
        {open ? <FaTimes /> : <FaBars />}
      </div>
      {open && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-black z-50'>
          <Link to="#startPage" onClick={toggleMenu} className='block py-2 px-4 border-b'>Home</Link>
          <Link to="#radar" onClick={toggleMenu} className='block py-2 px-4 border-b'>About</Link>
          <Link to="#projects" onClick={toggleMenu} className='block py-2 px-4 border-b'>Projects</Link>
          <Link to="/" onClick={toggleMenu} className='block py-2 px-4'>Resume</Link>
        </div>
      )}
    </nav>
  );
}

// import { Link } from 'gatsby';
// import React, { useState } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between">
//           <div className="flex space-x-4">
//             <h1 className="text-lg font-bold text-gray-900 uppercase">
//               My Site
//             </h1>
//           </div>
//           <div className="hidden md:flex items-center space-x-1">
//             <Link to="#startPage" className="nav-link">
//               Home
//             </Link>
//             <Link to="#radar" className="nav-link">
//               About
//             </Link>
//             <Link to="#projects" className="nav-link">
//               Projects
//             </Link>
//             <Link to="/" className="nav-link">
//               Resume
//             </Link>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu} className="outline-none mobile-menu-button">
//               {open ? (
//                 <FaTimes className="h-6 w-6 text-gray-500" />
//               ) : (
//                 <FaBars className="h-6 w-6 text-gray-500" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div className={`md:hidden mobile-menu ${open ? "flex" : "hidden"}`}>
//           <ul className="flex flex-col space-y-2">
//             <li>
//               <Link
//                 to="#startPage"
//                 className="nav-link"
//                 onClick={toggleMenu}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="#radar" className="nav-link" onClick={toggleMenu}>
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="#projects"
//                 className="nav-link"
//                 onClick={toggleMenu}
//               >
//                 Projects
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="nav-link" onClick={toggleMenu}>
//                 Resume
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
