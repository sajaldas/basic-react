import { createStore, combineReducers, applyMiddleware } from 'redux'
//import createSagaMiddleware from 'redux-saga'

import usersReducer from '../reducers/user-reducer'
// import todoReducer from '../reducers/todo-reducer'
// import signupReducer from '../reducers/signup-reducer'

//import rootSaga from "../sagas/RootSaga";

const allReducers = combineReducers({
  user: usersReducer,
//   todos: todoReducer,
//   loggedUser: signupReducer
})

// const confirmationMiddleware = store => next => action => {
//   //console.log('action = ', action)
//   if(action.payload.hasOwnProperty("doConfirm"))  
//   {
//     if(window.confirm('Are you sure ?'))
//     next(action)  
//   }
//   else
//   next(action)
// }

export default function configureStore() {    

  //const sagaMiddleWare = createSagaMiddleware()
  //let middlewares = [sagaMiddleWare]
  //middlewares = [...middlewares]
    const store = createStore(
        allReducers,
        //applyMiddleware(...middlewares)
    );    
    //sagaMiddleWare.run(rootSaga)
    return store;
}



