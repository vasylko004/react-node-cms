//@flow
import React, {Component, Fragment} from 'react';
import SignUpForm from '../../components/forms/singup';
import SignInForm from '../../components/forms/signin';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { type STATUSES, type USER, type RequestSignUP, REQUEST_SIGN_UP, UPDATE_FORM_STATUS, REQUEST_SIGN_IN} from '../../constants';

type Props = {
    signUpStatus: STATUSES,
    signInStatus: STATUSES,
    currentUser: USER,
    token: string,
    resetSignUpForm: ()=>void,
    submitRequestSignUp: (data: RequestSignUP)=>void,
    submitRequestSignIn: (data: {email: string, password: string})=>void
}

type State = {
    activeForm: "signup"|"signin"
}

class LoginPage extends Component<Props, State>{
    constructor(props:any){
        super(props);

        this.state = {
            activeForm: "signin"
        }
    }

    changeForm(name:"signup"|"signin"):()=>void{
        return ()=>{
            this.setState({activeForm: name});
        }
    }

    handleSignUpSubmit(data: RequestSignUP){
        if(this.props.submitRequestSignUp){
            this.props.submitRequestSignUp(data);
        }
    }

    handleSignInSubmit(data: { email: string, password: string }){
        if(this.props.submitRequestSignIn){
            this.props.submitRequestSignIn(data);
        }
    }

    render(){
        let {activeForm } = this.state;
        let { signUpStatus,  signInStatus, currentUser, token } = this.props
        const handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        const handleSignInSubmit = this.handleSignInSubmit.bind(this);
        if(currentUser && token){
            return <Redirect to="/admin/dashboard" />
        }
        //console.log(signUpStatus,  signInStatus, this.props);
        return (<div className="p-t5 p-b5">
            <div className="row">
                <div className="col s12 l3">

                </div>
                <div className="col s12 l6">
                {activeForm === 'signup'?(<Fragment>
                        <SignUpForm status={signUpStatus} onSubmit={handleSignUpSubmit} />
                        <p className="p-t5 center-align"> Have an account? <span className="action-text" onClick={this.changeForm("signin")}> Sign In </span> </p>
                    </Fragment>):(<Fragment>
                        <SignInForm status={signInStatus} onSubmit={handleSignInSubmit} />
                        <p className="p-t5 center-align"> Don't have an account? <span className="action-text" onClick={this.changeForm("signup")}> Sign Up </span> </p>
                    </Fragment>)}
                </div>
                <div className="col s12 l3">

                </div>
            </div>
        </div>)
    }
}

export default connect(state=>({
    signUpStatus: state.forms.signup,
    signInStatus: state.forms.signin,
    currentUser: state.users.current,
    token: state.users.token
}), dispatch=>({
    resetSignUpForm: ()=>{
        dispatch({ type: UPDATE_FORM_STATUS, data: { formName: "signup", status: 0 } });
    },
    submitRequestSignUp: (data:RequestSignUP)=>{
        dispatch({type: REQUEST_SIGN_UP, data: data})
    },
    submitRequestSignIn: (data: {email: string, password: string})=>{
        dispatch({ type: REQUEST_SIGN_IN, data: data });
    }
}))(LoginPage);