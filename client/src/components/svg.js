//@flow
import React, { Component } from 'react';
import { type Path, type Group } from '../constants';

type Props = {
    data: { groups: Array<Group>, paths: Array<Path> },
    classes: string,
    height?: string,
    width?: string
}

class Svg extends Component<Props,{}>{

    renderGroupsData(data: Array<Group>){
        let index = 0;
        return data.map<any>((item)=>{
            index++;
            return <g key={index}>{this.renderPathsData(item.paths?item.paths:[])}</g>
        })
    }

    renderPathsData(data: Array<Path>){
        let index = 0;
        return data.map<any>((item)=>{
            index++;
            return <path key={index} d={item.d?item.d:""} fill={item.fill?item.fill:""}></path>
        });
    }

    render(){
        let { classes, height, width, data } = this.props;

        return <svg className={classes} height={height||"24"} width={width||"24"}>
            {this.renderGroupsData(data.groups)}
            {this.renderPathsData(data.paths)}
        </svg>
    }
}

export default Svg;