
const { createStore,combineReducers,applyMiddleware} = require('redux');
const logger = require('redux-logger').default


//action

//type of an action
const buy_cake= 'buy_cake';

//action
// {
    // type:buy_cake;
    // info:"cakes are in the store";
// }

//action creator

function buycake(){
    return {
        type:buy_cake,
        info:'cakes are in the store'
    }
}
//action for icecream
const buy_icecream= 'buy_icecream';

//for action handler for icecream
function buyicecream(){
    return{
        type:buy_icecream
    }
}

//state
 
const initialcakestate ={
    numberOfCakes:10
}
//initial state for icecream
const initialicecreamstate ={
    numberOfIcecream:20
}

//reducers

function cakeReducers(state=initialcakestate,action){
    switch(action.type){
        case buy_cake:return{
            ...state,
            numberOfCakes:state.numberOfCakes - 1
        }
        default: return state;
}
} 

//icecream reducers
function icecreamReducers(state=initialicecreamstate,action) {
    switch (action.type) {
        case buy_icecream: return{
            ...state,
            numberOfIcecream: state.numberOfIcecream - 1
        }
        default: return state;
    }
    
}
//combining the reducers
const rootReducers =combineReducers({
    cake:cakeReducers,
    icecream: icecreamReducers
});
//creating store
const store = createStore(rootReducers,applyMiddleware(logger));

//accessing the state of the store
    const state = store.getState();
    console.log('current state:',state);
const unsubscribe=store.subscribe(()=>console.log('current state:',store.getState()))
//emitting the action
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyicecream())
store.dispatch(buyicecream())

unsubscribe();
