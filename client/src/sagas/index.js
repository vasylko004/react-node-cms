import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST_SIGN_UP, UPDATE_FORM_STATUS, REQUEST_SIGN_IN, UPDATE_AUTH_USER, UPDATE_PROFILE_DATA, REQUEST_UPDATE_USER, UPDATE_CURRENT_USER } from '../constants';
import { signup, signin, updateUser } from '../actions/users';


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

function* requestUpdateProfile(action){
    try{
        yield put({type: UPDATE_FORM_STATUS, data: {formName: "editProfile", status: 1}});
        const result = yield call(updateUser, action.id, action.data, action.token);
        yield put({ type: UPDATE_PROFILE_DATA, data: result });
        yield put({ type: UPDATE_CURRENT_USER, data: result });
        yield put({ type: UPDATE_FORM_STATUS, data: {formName: "editProfile", status: 2} })
    }catch(error){
        yield put({type: UPDATE_FORM_STATUS, data: {formName: "editProfile", status: 3}});
    }
}

function* actionsSaga(){
    yield takeEvery(REQUEST_SIGN_UP, requestSignUp);
    yield takeEvery(REQUEST_SIGN_IN, requestSignIn);
    yield takeEvery(REQUEST_UPDATE_USER, requestUpdateProfile);
}

export default actionsSaga;