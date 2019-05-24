//@flow
import React, { Component } from 'react';
import Form, {type DataType, validateData} from './form';
import TextField from '../inputs/text-filed';
import { type STATUSES } from '../../constants';
import Joi from '@hapi/joi';
import Button from '../buttons';
import CheckBox from '../inputs/checkbox';

type State = {
    data:{
        email: DataType,
        password: DataType
    }
}

type Props = {
    status?: STATUSES
}

class SignInForm extends Component<Props,State>{
    constructor(props:Props){
        super(props);

        this.state = { data:{
                email:{
                    validation: Joi.string().email({ minDomainSegments: 2 }).required(),
                    error: false
                },
                password: {
                    validation: Joi.string().required(),
                    error: false
                }
            }
        }
    }

    handleSubmit(DATA:{}):void{
        let {data} = this.state
        /* */
        let result = validateData(DATA, data);
        this.setState({
            data: data
        });
        if(result.hasAnyError){

        }else{

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