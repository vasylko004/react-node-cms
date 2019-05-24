import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REQUEST_SIGN_UP, UPDATE_FORM_STATUS } from '../constants';
import { signup } from '../actions/users';


function* requestSignUp(action){
    try{
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 1}});
        yield call(signup, action.data);
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 2}});
    }catch(error){
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 3}});
    }
}

function* actionsSaga(){
    yield takeEvery(REQUEST_SIGN_UP, requestSignUp);
}

export default actionsSaga;