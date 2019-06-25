// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { type USER, type STATUSES, REQUEST_UPDATE_USER, UPDATE_PROFILE_DATA, SERVER } from '../../constants';
import { connect } from 'react-redux';
import EditProfileForm from '../../components/forms/edit-profile';
import './profile.css';

type Props = {
    user: USER,
    profile: USER,
    token: string,
    formStatus: STATUSES,
    updateUser: (id:string, data: FormData, token:string)=> void,
    setProfileData: (data: USER)=>void
}

class Profile extends Component<Props, {}>{
    constructor(props:Props){
        super(props)
        props.setProfileData(props.user);
    }

    handleSubmit(data:FormData): void{
        if(this.props.updateUser) this.props.updateUser(this.props.profile._id, data, this.props.token);
    }

    render(){
        let { user, profile, formStatus } = this.props;
        let handleSubmit = this.handleSubmit.bind(this);

        if(!user) {
            return <Redirect to="/admin/login" />;
        }

        let userType:string = "";
        switch(user.role){
            case 0:
                userType = "Administrator"
            break;
            default:
                userType = "Editor"
            break;
        }

        return (<div className="row">
            <div className="col s12 l6">
                <div className="card profile-edit-form">
                    <div className="card-title purple darken-3">
                         Edit 
                    </div>
                    <div className="card-content ">
                        <EditProfileForm status={formStatus} userData={profile} onSubmit={handleSubmit}  />
                    </div>
                </div>
            </div>
            <div className="col s12 l6">
                <div className="card user-info"> 
                    <div className="card-content profile-description">
                        <img src={user.avatar?(SERVER.apihost + user.avatar):"/images/user.svg"} alt="profile-avatar" />
                        <p className="user-full-name"> { user.firstName + " " + user.lastName } </p>
                        <p>{userType}</p>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default connect(state=>({
    user: state.users.current,
    profile: state.users.profile,
    token: state.users.token,
    formStatus: state.forms.editProfile
}),
dispatch=>({
    updateUser: (id: string, data:FormData, token: string)=>{
        dispatch({type: REQUEST_UPDATE_USER, data: data, id: id, token: token});
    },
    setProfileData: (data: USER)=>{
        dispatch({type: UPDATE_PROFILE_DATA, data: data});
    }
}))(Profile);