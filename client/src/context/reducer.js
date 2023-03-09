import {
    DISPLAY_ALERT,
    CLEAR_ALERT, 
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN, 
    CREATE_JOB_SUCCESS, 
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    DELETE_JOB_ERROR,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE
} from './actions'
import { intialState } from './appContext'

const reducer = (state, action)=>{
    
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values'
            }  
            
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            }
        case SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText,
            }
        case SETUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case LOGOUT_USER:
            return {
                ...intialState,
                user: null,
                token: null,
                userLocation: '',
                jobLocation: ''
            }    
        case UPDATE_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Profile Updated'
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        
        case HANDLE_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
                page: 1 
            }
        case CLEAR_VALUES:
            const initialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation : state.userLocation ,
                jobType: 'full-time',
                status: 'pending',
            }
            return {
                ...state,
               ...initialState
            }

        case CREATE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job Created!'
            }
        case CREATE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case GET_JOBS_BEGIN: 
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }   
        case GET_JOBS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                job: action.payload.job,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages
                
            }
        case SET_EDIT_JOB:
            const job = state.job.find((job)=>job._id === action.payload.id)
            const {_id, position, company, jobLocation, jobType, status} = job;

            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status
            }
        case DELETE_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
                  }
        case EDIT_JOB_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Updated!'
            }
        case EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
                  }
        case SHOW_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false
            }
        case SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
                page: 1
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        default:
            throw new Error (`no such action : ${action.type}`)
    }

    
}

export default reducer;