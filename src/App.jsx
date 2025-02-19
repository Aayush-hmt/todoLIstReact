// // import { useState } from 'react'
// import './App.css'
// // import HeaderSec from './component/HeaderSec'
// // import getPost from './api/postApi';
// // import { useEffect } from 'react';
// // import Postes from './component/Posts'
// import Posts from './component/Posts';

// function App() {
//   return (
//     <>
//       <section>
//         {/* <HeaderSec /> */}
//         <section>
//           <Posts />
//         </section>
//       </section>
//     </>
//   )
// }

// export default App


import "./App.css";
import Posts from "./component/Posts";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <Posts />
    </main>
  );
}

export default App;
