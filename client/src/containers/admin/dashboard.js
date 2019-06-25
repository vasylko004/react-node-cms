// @flow
import React, {Component} from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import {type USER } from '../../constants';

type Props = {
    user: USER
}

class DashboardPage extends Component<Props,{}>{

    render(){
        const { user } = this.props;
        if(!user) return <Redirect to="/admin/login" />

        return (<div className="p-t5 p-b5">
            <div className="row">
                <h2 align="center"> Dashboard </h2>
            </div>
        </div>);
    }
}

export default connect(state=>({
    user: state.users.current
}), dispatch=>({}))(DashboardPage);