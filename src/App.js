import './App.css';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Swiper, SwiperSlide } from "swiper/react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <Home/>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    {/* <Toys/> */}

    </>
  );
}

export default App;



// import ReactDOM from 'react-dom/client';
// import './App.css';
// import Home from './Pages/Home';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Swiper, SwiperSlide } from "swiper/react";



// function App() {
//   return (
//     <>
//     <Home/>
//     </>
//   );
// }

// export default App;