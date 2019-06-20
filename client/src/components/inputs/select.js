//@flow
import React, { Component } from 'react';
import {type DropDownData } from '../../constants';
import Svg from '../svg';

type Props = {
    classes?: string,
    name: string,
    data: Array<DropDownData>,
    label: string,
    multiple?: boolean,
    disabled?: boolean,
    placeholder?: string,
    value?: string
}

type State = {
    value: string,
    name: string,
    showList: boolean
}

class SelectInput extends Component<Props, State>{
    constructor(props:Props){
        super(props)
        let name = this.getNameByValue(props.value || "", props.data);
        this.state = {
            value: props.value || "",
            name: name,
            showList: false
        }
    }

    getNameByValue(value: string,data: Array<DropDownData>):string{
        for (let i = 0; i < data.length; i++) {
           if(data[i].value === value) return data[i].name
        }

        return "";
    }

    renderListElememts(){
        const { data } = this.props;
        const { value } = this.state;
        let handleClick = (name, key)=>{
            return ()=>{
                this.setState({
                    value: key.toString(),
                    name: name
                })
            }
        }
        return data.map<any>((item:DropDownData, index: number)=>{
            return <li key={index} className={value === item.value.toString()?"selected":""} onClick={handleClick(item.name, item.value)}> <span> {item.name} </span> </li>
        })
    }

    renderOptions(){
        const { data } = this.props;
        return data.map<any>((item: DropDownData, index: number)=>{
            return <option key={index} value={item.value}> {item.name} </option>
        })
    }

    toggleList():void{
        let { showList } = this.state;
     
        this.setState({
            showList: !showList
        });
        
    }

    handleInputBlur(evt: Event):void{
        //console.log(evt);
        setTimeout(this.toggleList.bind(this), 200);
    }

    render(){
        const { label, name, placeholder, disabled } = this.props;
        let { showList, value } = this.state;
        let styles = {
            display: 'none'
        }
        if(showList){
            styles = {
                display: 'block',
                opacity: "1",
                width: "100%",
                transform: "scaleX(1) scaleY(1)",
            }
        }

        let toggleList = this.toggleList.bind(this);
        let handleInputBlur = this.handleInputBlur.bind(this);

        return <div className="input-field">
            <div className="select-wrapper"> 
                <input type="text" className="select-dropdown dropdown-trigger" readOnly onClick={toggleList} value={this.state.name || placeholder || "Select"} disabled={disabled} onBlur={ handleInputBlur }/>               
                <Svg classes="caret" height="24" width="24" data={{groups: [], paths:[ {d: "M7 10l5 5 5-5z", type: "path"}, 
                    {d: "M0 0h24v24H0z", fill: "none", type:"path"}]}} />
                <ul className="dropdown-content select-dropdown" style={styles}>
                    <li className={"disabled" + (!value?" selected":"")}> <span> {placeholder || "Select"}  </span> </li>
                    {this.renderListElememts()}
                </ul>
                <select tabIndex="-1" name={name} value={value} readOnly>
                    {this.renderOptions()}
                </select>
            </div>
            <label> {label} </label>
        </div>
    }
}

export default SelectInput;