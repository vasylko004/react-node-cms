//@flow
import React, { Component } from 'react';

type Props = {
    classes?: string,
    label: string,
    checked?: boolean,
    name: string,
    type?: "checkbox" | "switch",
    disabled?: boolean
}

class CheckBox extends Component<Props,any>{

    render(){
        const { checked, label, name, type, classes, disabled } = this.props;
        let _type:string =  "checkbox";
        if(type) _type = type;
        let _classes = "check-box"; 
        if(_type === "switch") _classes = "switch";
        if( classes ) _classes += " " + classes;
        let _extends:{disabled?: string } = {};
        if(disabled) _extends['disabled'] = "disabled";
        return <div className={_classes}>
            {_type === "checkbox"?(<label htmlFor={"check_" + name}>
                    <input name={name} id={"check_" + name} type="checkbox" {..._extends} defaultChecked={!!checked} />
                    <span> { label } </span>
                </label>):(<label> <span className="font-size-bigger">{ label }</span> Off 
                    <input name={name} id={"check_" + name} type="checkbox" {..._extends} defaultChecked={!!checked} />  
                    <span className="lever"></span> On 
                </label>)}
        </div>
    }
}

export default CheckBox;