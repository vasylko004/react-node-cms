//@flow
import React, {Component, Fragment} from 'react';
import SignUpFrom from '../../components/forms/singup';
import SignInForm from '../../components/forms/signin';
import { connect } from 'react-redux';
import { type STATUSES, type USER, type RequestSignUP, REQUEST_SIGN_UP, UPDATE_FORM_STATUS} from '../../constants';

type Props = {
    signUpStatus: STATUSES,
    signInStatus: STATUSES,
    resetSignUpForm: ()=>void,
    submitRequestSubmit: (data: RequestSignUP)=>void
}

type State = {
    activeForm: "signup"|"signin"
}

class LoginPage extends Component<Props, State>{
    constructor(props:any){
        super(props);

        this.state = {
            activeForm: "signup"
        }
    }

    changeForm(name:"signup"|"signin"):()=>void{
        return ()=>{
            this.setState({activeForm: name});
        }
    }

    handleSubmit(data: RequestSignUP){
        if(this.props.submitRequestSubmit){
            this.props.submitRequestSubmit(data);
        }
    }

    render(){
        let {activeForm } = this.state;
        let { signUpStatus,  signInStatus } = this.props
        const handleSubmit = this.handleSubmit.bind(this);
        return (<div className="p-t5 p-b5">
            <div className="row">
                <div className="col s12 l3">

                </div>
                <div className="col s12 l6">
                {activeForm === 'signup'?<Fragment>
                        <SignUpFrom status={signUpStatus} onSubmit={handleSubmit} />
                        <p className="p-t5 center-align"> Have an account? <span className="action-text" onClick={this.changeForm("signin")}> Sign In </span> </p>
                    </Fragment>:<Fragment>
                        <SignInForm status={signInStatus} />
                        <p className="p-t5 center-align"> Don't have an account? <span className="action-text" onClick={this.changeForm("signup")}> Sign Up </span> </p>
                    </Fragment>}
                </div>
                <div className="col s12 l3">

                </div>
            </div>
        </div>)
    }
}

export default connect(state=>({
    signUpStatus: state.forms.signup,
    signInStatus: state.forms.signin
}), dispatch=>({
    resetSignUpForm: ()=>{
        dispatch({ type: UPDATE_FORM_STATUS, data: { formName: "signup", status: 0 } });
    },
    submitRequestSubmit: (data:RequestSignUP)=>{
        dispatch({type: REQUEST_SIGN_UP, data: data})
    }
}))(LoginPage);