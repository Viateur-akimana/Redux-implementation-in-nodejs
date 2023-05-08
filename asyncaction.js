const {createStore,applyMiddleware}= require('redux')
const thunkmiddleware = require('redux-thunk').default
const axios = require('axios')
//defining the initialstate of the redux application
const initialstate ={
        loading:false,
        data:[],
        error:''
}
//defining the actons
const fetch_users_request = 'fetch_users_request';
const fetch_users_success = 'fetch_users_success';
const fetch_users_failure = 'fetch_users_failure';

//defining the action creators

const Fetch_users_request = ()=>{
     return{
        type:fetch_users_request
     }   
}

const Fetch_users_success = (users)=>{
    return{
        type:fetch_users_success,
        payload:users

    }
}
const Fetch_users_failure = (error)=> {
    return{
        type:fetch_users_failure,
        payload:error
    }
}

//defining the reducers

const reducer = (state=initialstate,action) =>{
    switch(action.type){
    case 'fetch_users_request': 
    return{
        ...state,
        loading:true
    }
    case 'fetch_users_success':
        return{
            loading:false,
            data:action.payload,
            error:''
        }
        case 'fetch_users_failure':
            return{
                loading:false,
                error:action.payload
            }
}

}

//fetching data from the endpoints
const fetch_users = ()=>{
    return function(dispatch){
        dispatch(Fetch_users_request())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            const users = response.data.map(user=>user.id)
            dispatch(Fetch_users_success(users))
        })
        .catch((error)=>{
            dispatch(Fetch_users_failure(error.message))
        })
    }
}


//creating the redux store
const store = createStore(reducer,applyMiddleware(thunkmiddleware));
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetch_users());

