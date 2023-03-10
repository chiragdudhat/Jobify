
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AddJobs, AllJobs, Profile, SharedLayout, Stats}   from "./pages/dashboard";
import {Register, Landing, Error} from './pages'
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/" element={
                    <ProtectedRoute>
                       <SharedLayout/>
                    </ProtectedRoute>
        }>
                    
          <Route index element={<Stats/>}/>
          <Route path='all-jobs' element={<AllJobs/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='add-job' element={<AddJobs/>}/>
        </Route> 
      <Route path="/register" element={<Register/>} />
      <Route path="/landing" element={<Landing/>} />
      <Route path="*" element={<Error/>} />
      
    </Routes>
   </BrowserRouter>
  );
}

export default App;
