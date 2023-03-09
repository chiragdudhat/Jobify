import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert,FormRow } from "../../components";
import { useAppContext } from "../../context/appContext"

const Profile = () =>{

    const {user, displayAlert, updateUser, isLoading, showAlert} = useAppContext()

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setlastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)

   
    const onSubmit = (e)=> {
        e.preventDefault()
        if(!name || !email ||!lastName || !location){
            displayAlert()
            return 
        }
      
        updateUser({name, email, location, lastName});
    }
    return (
         <Wrapper>
           
            <form className='form' onSubmit={onSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <FormRow
                        type= 'text'
                        name= 'name'
                        value= {name}
                        handleChange= {(e) => setName(e.target.value)}
                    />
                
                    <FormRow
                    labelText= 'last name'
                    type= 'text'
                    name= 'lastName'
                    value= {lastName}
                    handleChange= {(e) => setlastName(e.target.value)}
                    />
                    <FormRow
                    type= 'email'
                    name= 'email'
                    value= {email}
                    handleChange= {(e) => setEmail(e.target.value)}
                    />
                    <FormRow
                    type= 'text'
                    name= 'location'
                    value= {location}
                    handleChange= {(e) => setLocation(e.target.value)}
                    />
                    
                    <button  className="btn btn-block" type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'Save Changes'}</button>
                </div>
            </form>
            
         </Wrapper>
    )
}

export default Profile