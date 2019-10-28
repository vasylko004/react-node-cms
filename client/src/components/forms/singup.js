// @flow
import React, { Component } from 'react';
import { Validations } from '../../utils/validations';
import Form, {type DataType, validateData} from './form';
import { type STATUSES, type RequestSignUP } from '../../constants';
import TextField from '../inputs/text-filed';
import Button from '../buttons';

type State = {
    data: {
        username: DataType,
        email: DataType,
        firstName: DataType,
        lastName: DataType,
        password: DataType,
        password_repeat: DataType
    }
}

type Props = {
    status?: STATUSES,
    onSubmit?: (data: RequestSignUP)=>void
}

class SignUpForm extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        let validator = new Validations({});

        this.state = {
            data:{
                username:{
                   validation: validator.set("string|min:3|max:30"),
                   error: false
                },
                email: {
                    validation: validator.set("email"),
                    error: false
                },
                firstName: {
                    validation: validator.set("string|min:3|max:30"),
                    error: false                    
                },
                lastName: {
                    validation: validator.set("string|min:3|max:30"),
                    error: false                    
                },
                password: {
                    validation: validator.set("string"),
                    error: false                    
                },
                password_repeat: {
                    validation: validator.set("string"),
                    error: false                    
                }
            }
        }
    }

    handleSubmit(DATA:RequestSignUP):void{
        let {data} = this.state
        /* */
        let result = validateData(DATA, data);
        if(DATA.password && DATA.password_repeat && DATA.password === DATA.password_repeat){
            data.password_repeat.error = false;
        }else{
            data.password_repeat.error = true;
        }
        this.setState({
            data: data
        });
        
        if(!result.hasAnyError){
            if(this.props.onSubmit) this.props.onSubmit(DATA);
        }
    }

    render(){
        const handleSubmit = this.handleSubmit.bind(this);
        let { status } = this.props;
        let {data} = this.state;
        return <div className="card-form">
            <Form onSubmit={handleSubmit} status={ status||0 } >
                <p className="form-title p-b5"> Sign Up </p>
                <TextField name="username" label="Username" validation={data.username.validation} isInvalid={data.username.error} />
                <TextField name="email" type="email" label="Email" validation={data.email.validation} isInvalid={data.email.error}  />
                <TextField name="firstName" label="First Name" validation={data.firstName.validation} isInvalid={data.firstName.error} />
                <TextField name="lastName" label="Last Name" validation={data.lastName.validation} isInvalid={data.lastName.error} />
                <TextField name="password" type="password" label="Password" validation={data.password.validation} isInvalid={data.password.error} />
                <TextField name="password_repeat" type="password" label="Repeat Password" validation={data.password_repeat.validation} isInvalid={data.password_repeat.error} />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>
            </Form>
        </div>
    }
}

export default SignUpForm;