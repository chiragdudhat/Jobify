import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import BigSideBar from "../../components/BigSidebar"
import Navbar from "../../components/Navbar"
import SmallSideBar from "../../components/SmallSidebar"

const SharedLayout = () =>{
     return (
          <Wrapper>
               <main className="dashboard">    
                    <SmallSideBar/>
                    <BigSideBar/>
                    <div>
                         <Navbar/> 
                         <div className="'dashboard-page">
                              <Outlet/>
                         </div>
                     </div>
               </main>
          </Wrapper> 
     )

}
   
export default SharedLayout