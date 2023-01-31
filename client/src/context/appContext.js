import React, {useState, useReducer, useContext} from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';
import reducer from './reducer';


const intialState = {
    isLoading : false,
    showAlert: false,
    alertText: '',
    alertType: ''
}


const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState); 

    const displayAlert = ()=>{
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = ()=> {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000);
    }

    return (
        <AppContext.Provider value={{...state, displayAlert}}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = ()=>{
    return useContext(AppContext)
}

export { AppProvider, intialState, useAppContext}