
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FormRow, Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'

const AddJobs = () =>{
    const {
        isLoading,
        position,
        company,
        jobLocation, 
        status,
        jobType,
        displayAlert,
        showAlert, 
        statusOptions,
        jobTypeOptions,
        isEditing,
        handleChange,
        clearValues,
        createJob,
        editJob
    } = useAppContext();
    
    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange({name, value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!position || !company || !jobLocation){
            displayAlert()
            return 
        }
        if(isEditing){
            return editJob()
        }
        createJob()
    }
    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' :'Add Job'}</h3>
                {showAlert && <Alert/>}

                <div className='form-center'>
                <FormRow
                    type='text' 
                    value={position} 
                    name='position'
                    handleChange={handleJobInput}
                /> 
                <FormRow
                    type='text' 
                    value={company} 
                    name='company'
                    handleChange={handleJobInput}
                /> 
                <FormRow
                    type='text' 
                    labelText='Job Location'
                    value={jobLocation} 
                    name='jobLocation'
                    handleChange={handleJobInput}
                /> 
                <FormRowSelect 
                    name='status'
                    value={status}
                    handleChange={handleJobInput}
                    list={statusOptions}

                />
                <FormRowSelect 
                    name='jobType'
                    labelText="job type"
                    value={jobType}
                    handleChange={handleJobInput}
                    list={jobTypeOptions}

                />
                <div className='btn-container'>
                    <button 
                        type='submit' 
                        className='btn btn-block submit-btn' 
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                    <button  
                        className='btn btn-block submit-btn' 
                        onClick={(e)=>{
                            e.preventDefault()
                            clearValues()
                        }}
                    >   Clear
                    
                    </button>
                </div>
                  
                </div>
            </form>
            
        </Wrapper>
    )
}

export default AddJobs