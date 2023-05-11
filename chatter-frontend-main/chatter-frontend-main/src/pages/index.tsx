import MainLeftSide from './mainLeftSide';
import LoginForm from '../layout/LoginForm';
import {  useAppSelector } from '../redux/hooks';
import { getUser } from '../redux/userSlice';
import HomeChat from './chat';


function Home() {
  const userData = useAppSelector(getUser);
  return (
    <div className="main-wrapper d-flex row flex-grow-1 body-height">
         {userData.authToken ?(<HomeChat/>):(
           <div style={{display: "flex"}}>
          <MainLeftSide/>
          <LoginForm/>
          </div>
         )}
      
     </div>
  );
}
export default Home;
