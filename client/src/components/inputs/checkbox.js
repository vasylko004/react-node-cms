//@flow
import React, { PureComponent } from 'react';

type Props = {
    classes?: string,
    label: string,
    checked?: boolean,
    name: string,
    type?: "checkbox" | "switch",
    disabled?: boolean
}

type State = {
    checked: boolean| null
 }

class CheckBox extends PureComponent<Props,State>{
    state = {
        checked: null
    }

    handleChange(evt: SyntheticInputEvent<HTMLInputElement>):void{
       this.setState({
            checked: evt.target.checked
        });
    }

    render(){
        const { label, name, type, classes, disabled } = this.props;
        let _type:string =  "checkbox";
        let checked = this.props.checked;
        if(this.state.checked !== null) { checked = this.state.checked }
        if(type) _type = type;
        let _classes = "check-box"; 
        if(_type === "switch") _classes = "switch";
        if( classes ) _classes += " " + classes;
        let _extends:{disabled?: string } = {};
        if(disabled) _extends['disabled'] = "disabled";
        let handleChange = this.handleChange.bind(this);
        return <div className={_classes}>
            {_type === "checkbox"?(<label htmlFor={"check_" + name}>
                    <input name={name} id={"check_" + name} type="checkbox" {..._extends} checked={!!checked} />
                    <span> { label } </span>
                </label>):(<label> <span className="font-size-bigger">{ label }</span> Off 
                    <input name={name} id={"check_" + name} onChange={handleChange} type="checkbox" {..._extends} checked={!!checked} />  
                    <span className="lever"></span> On 
                </label>)}
        </div>
    }
}

export default CheckBox;