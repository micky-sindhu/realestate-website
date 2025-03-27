import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainRoutes from './routes';
import SignInComp from './signin';

function App() {

  return (
   <>
   <Routes>
    <Route path='/signin' element={<SignInComp/>}/>
    <Route path='*' element={<MainRoutes/>}/>
   </Routes>
   </>
  );
}

export default App;
