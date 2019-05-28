import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_SIGN_UP, UPDATE_FORM_STATUS, REQUEST_SIGN_IN, UPDATE_AUTH_USER } from '../constants';
import { signup, signin } from '../actions/users';


function* requestSignUp(action){
    try{
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 1}});
        yield call(signup, action.data);
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 2}});
    }catch(error){
        yield put({type: UPDATE_FORM_STATUS, data:{formName: "signup", status: 3}});
    }
}

function* requestSignIn(action){
    try{
        yield put({ type: UPDATE_FORM_STATUS, data: { formName: 'signin', status: 1 } });
        const result = yield call(signin, action.data);
        yield put({ type: UPDATE_FORM_STATUS, data:{ formName: "signin", status: 2 }});
        yield put({ type: UPDATE_AUTH_USER, data: result });
    }catch(error){
        yield put({ type: UPDATE_FORM_STATUS, data: { formName: 'signin', status: 3 } });
    }
}

function* actionsSaga(){
    yield takeEvery(REQUEST_SIGN_UP, requestSignUp);
    yield takeEvery(REQUEST_SIGN_IN, requestSignIn);
}

export default actionsSaga;