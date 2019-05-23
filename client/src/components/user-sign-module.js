//@flow
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

type Props = {
    username?: string,
    avatar?: string
}

class UserSign extends Component<Props, {}>{
    render(){
        let { username, avatar } = this.props;
        let Avatar:string = avatar || "/images/user.svg";
        return <div className="user-sign-module">
            {username?<span>{username}</span>:<Link to="/admin/login"> Login </Link>}
            <img alt="avatar" className="user-avatar" src={Avatar} />
        </div>
    }
}

export default UserSign;