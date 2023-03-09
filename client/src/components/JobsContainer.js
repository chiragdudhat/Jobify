import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Alert from './Alert'
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {getJobs, job, isLoading, page, totalJobs,
    search, searchType, searchStatus, sort, numOfPages, showAlert } = useAppContext()

    useEffect(()=> {
        getJobs()
        // eslint-disable-next-line
    }, [ page, search, searchType, searchStatus, sort])
    
    if( isLoading ){
        return <Loading center/>
    }

    
    if(job.length === 0){
        return(
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            {showAlert && <Alert/>}
            <h5> 
                {totalJobs} job{job.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {job.map((job)=>{
                    return <Job key={job._id} {...job}/>
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer/> }
        </Wrapper>
        
    )
}

export default JobsContainer