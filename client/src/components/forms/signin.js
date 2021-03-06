//@flow
import React, { Component } from 'react';
import Form, {type DataType, validateData} from './form';
import TextField from '../inputs/text-filed';
import { type STATUSES } from '../../constants';
import { Validations } from '../../utils/validations';
import Button from '../buttons';
import CheckBox from '../inputs/checkbox';

type State = {
    data:{
        email: DataType,
        password: DataType
    }
}

type Props = {
    status?: STATUSES,
    onSubmit?: (data: { email: string, password: string })=>void
}

class SignInForm extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        let validator = new Validations({});

        this.state = { data:{
                email:{
                    validation: validator.set("email"),
                    error: false
                },
                password: {
                    validation: validator.set("string"),
                    error: false
                }
            }
        }
    }

    handleSubmit(DATA:{email: string, password: string}):void{
        let {data} = this.state
        /* */
        let result = validateData(DATA, data);
        this.setState({
            data: data
        });
        if(!result.hasAnyError){
           if(this.props.onSubmit) this.props.onSubmit(DATA);
        }
    }

    render(){
        let { email, password } = this.state.data;
        let { status } = this.props;
        let handleSubmit:(data:{})=>void = this.handleSubmit.bind(this);
        return (<div  className="card-form">
            <Form onSubmit={handleSubmit} status={status||0} successOutput={<div></div>}>
                <p className="form-title p-b5"> Sign In </p>
                <TextField name="email" type="email" label="Email" validation={email.validation} isInvalid={email.error}  />
                <TextField name="password" type="password" label="Password" validation={password.validation} isInvalid={password.error} />
                <CheckBox name="remember_me" label="Remember Me"  />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>
            </Form>
        </div>);
    }
}


export default SignInForm;