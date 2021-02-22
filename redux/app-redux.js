/* import {createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import * as firebase from 'firebase';
import firebaseConfig from "../firebaseConfig";


//initial state
const initialState = {
    favoriteAnimal: 'ducks',
    personData: {}
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'setFavoriteAnimal': 
            return { ...state, favoriteAnimal: action.value }

        case 'setPersonData':
            return {...state, personData: action.value}

        default: return state
    }
}

//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {store};

//action creators
const setFavoriteAnimal = (favoriteAnimal) => {
    return {
      type: "setFavoriteAnimal",
      value: favoriteAnimal, //value
    };
}
const setPersonData = (personData) => {
  return {
    type: "setPersonData",
    value: personData, //value
  };
};

 const cccc = {
   apiKey: "AIzaSyAjGUDErzymYfXh8vYIqEmSsg3wzvqmiRg",
   authDomain: "mascotasapp-f1946.firebaseapp.com",
   projectId: "mascotasapp-f1946",
   storageBucket: "mascotasapp-f1946.appspot.com",
   messagingSenderId: "679096468889",
   appId: "1:679096468889:web:7d2ca7a4c9148c54b9ff08",
 };

//return a function gracias a thunkMiddleware
const watchPersonData = () => {
    return function(dispatch){
        firebase.database().ref('person').on("value", function(snapshot){
            let personData = snapshot.val();
            dispatch(setPersonData(personData))
        }, function(error){

        });
    }
}


export { setFavoriteAnimal, setPersonData, watchPersonData }; */