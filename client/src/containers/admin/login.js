//@flow
import React, {Component, Fragment} from 'react';
import SignUpFrom from '../../components/forms/singup';
import SignInForm from '../../components/forms/signin';

type State = {
    activeForm: "signup"|"signin"
}

class LoginPage extends Component<any, State>{
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

    render(){
        let {activeForm } = this.state;

        return (<div className="p-t5 p-b5">
            <div className="row">
                <div className="col s12 l3">

                </div>
                <div className="col s12 l6">
                {activeForm === 'signup'?<Fragment>
                        <SignUpFrom />
                        <p className="p-t5 center-align"> Have an account? <span className="action-text" onClick={this.changeForm("signin")}> Sign In </span> </p>
                    </Fragment>:<Fragment>
                        <SignInForm />
                        <p className="p-t5 center-align"> Don't have an account? <span className="action-text" onClick={this.changeForm("signup")}> Sign Up </span> </p>
                    </Fragment>}
                </div>
                <div className="col s12 l3">

                </div>
            </div>
        </div>)
    }
}

export default LoginPage;