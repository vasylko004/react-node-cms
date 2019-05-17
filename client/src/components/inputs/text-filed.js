//@flow
import React, { Component, Fragment} from 'react';

type Props = {
    classes?: string,
    placeholder?: string, 
    label: string,
    helperText?: string,
    type?: "text"|"email"|"number"|"password",
    name: string,
    error?: string,
    value?: string,
    disabled?: boolean,
    onChange?: (text:string)=>void,
}

type State = {
    active: boolean
}

class TextField extends Component<Props, State>{
    inputRef: ?HTMLInputElement;

    constructor(props: Props){
        super(props);

        this.state = {
            active: false
        }

        this.inputRef = null;
    }

    handleInputFocus():void{
        this.setState({ active: true })
    }

    handleInputBlur():void{
        this.setState({active: false});
    }

    render(){
        const handleInputFocus:()=>void = this.handleInputFocus.bind(this);
        const handleInputBlur:()=>void = this.handleInputBlur.bind(this);
        let {classes, placeholder, helperText, error, disabled, type} = this.props;
        let {active} = this.state;
        const labelFiled:string = this.props.label;
        if(!classes) classes = "";

        let propeties: {
            disabled?: string,
            placeholder?: string
        } = { }
        if(disabled) propeties['disabled'] = "disabled";
        if(placeholder) propeties["placeholder"] = placeholder;

        return (<div className={ "input-field " + classes}>
            <input type={type?type:"text"} className={error?"validate invalid":""} {...propeties} autoComplete={type === 'password'?"off":"on"} ref={(input)=>{ this.inputRef = input }} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            <label className={placeholder||active?"active":""}>{labelFiled}</label>
            {helperText?(<span className="helper-text" data-error={error?error:""}>{ helperText }</span>):(<Fragment />)}
        </div>)
    }
}

export default TextField;