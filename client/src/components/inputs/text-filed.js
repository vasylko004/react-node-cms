//@flow
import React, { Component, Fragment} from 'react';
import Joi from '@hapi/joi';

type Props = {
    classes?: string,
    placeholder?: string, 
    label: string,
    helperText?: string,
    type?: "text"|"email"|"number"|"password",
    name: string,
    errorMessage?: string,
    isInvalid?: boolean, 
    value?: string,
    disabled?: boolean,
    onChange?: (text:string)=>void,
    validation: Joi.Any | Joi.String | Joi.Email | Joi.Number
}

type State = {
    active: boolean,
    isInvalid: boolean
}

class TextField extends Component<Props, State>{
    inputRef: ?HTMLInputElement;

    constructor(props: Props){
        super(props);

        this.state = {
            active: false,
            isInvalid: false
        }

        this.inputRef = null;
    }

    handleInputFocus():void{
        this.setState({ active: true })
        if(this.inputRef) this.inputRef.focus();
    }

    handleInputBlur():void{
        if(!(this.inputRef && this.inputRef.value)){
            this.setState({active: false});
        }
    }

    setAsInvalid(){
        this.setState({ isInvalid: true });
    }

    setAsValid(){
        this.setState({ isInvalid: false });
    }


    render(){
        const handleInputFocus:()=>void = this.handleInputFocus.bind(this);
        const handleInputBlur:()=>void = this.handleInputBlur.bind(this);
        let {classes, placeholder, helperText, errorMessage, disabled, type, name, value} = this.props;
        let isInvalid = this.props.isInvalid || this.state.isInvalid; 
        let {active} = this.state;
        const labelFiled:string = this.props.label;
        if(!classes) classes = "";

        let propeties: {
            disabled?: string,
            placeholder?: string,
            defaultValue?: string
        } = { }
        if(disabled) propeties['disabled'] = "disabled";
        if(placeholder) propeties["placeholder"] = placeholder;
        if(value) propeties["defaultValue"] = value;

        return (<div className={ "input-field " + classes}>
            <input type={type?type:"text"} name={name} className={isInvalid?"validate invalid":""} {...propeties} autoComplete={type === 'password'?"off":""} ref={(input)=>{ this.inputRef = input }} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            <label className={placeholder||value||active?"active":""} onClick={handleInputFocus}>{labelFiled}</label>
            {helperText||isInvalid?(<span className="helper-text" data-error={errorMessage?errorMessage:"error"}>{ helperText }</span>):(<Fragment />)}
        </div>)
    }
}

export default TextField;