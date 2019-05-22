//@flow
import React, { Component } from 'react';

type Props = {
    classes?: string,
    label: string,
    checked?: boolean,
    name: string
}

class CheckBox extends Component<Props,any>{

    render(){
        const { checked, label, name } = this.props;
        return <div className="check-box">
            <label htmlFor={"check_" + name}>
                <input name={name} id={"check_" + name} type="checkbox" defaultChecked={!!checked} />
                <span> { label } </span>
            </label>
        </div>
    }
}

export default CheckBox;