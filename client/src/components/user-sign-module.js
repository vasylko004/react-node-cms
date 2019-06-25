//@flow
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

type Props = {
    username?: string,
    avatar?: string,
    logout?: ()=>void
}

type State = {
    dropDown: boolean
}

class UserSign extends Component<Props, State>{
    constructor(props:Props){
        super(props);

        this.state = {
            dropDown: false
        }

        let body = document.querySelector('body');
        
        if(body){
            body.addEventListener("click", ()=>{
                if(this.state.dropDown){
                    this.setState({
                        dropDown: false
                    })
                }
            })
        }
    }

    toggleDropDown():void{
        let { dropDown } = this.state;
        let { username } = this.props;
        // console.log(" toggleDropDown - ",username);
        if(username){
            this.setState({
                dropDown: !dropDown
            });
        }
    }

    logout():void{
        if(this.props.logout) this.props.logout();
    }

    render(){
        let { username, avatar } = this.props;
        let Avatar:string = avatar || "/images/user.svg";
        let { dropDown } = this.state;
        let Styles:{display?: string, opacity?: string} = {};
        let toggleDropDown = this.toggleDropDown.bind(this);
        let logout = this.logout.bind(this);
        if(dropDown){
            Styles = { display: "block", opacity: "1" };
        }
        //console.log(dropDown, Styles);
        return <div className="user-sign-module">
            {username?<span>{username}</span>:<Link to="/admin/login"> Login </Link>}
            <img alt="avatar" className="user-avatar" src={Avatar} onClick={toggleDropDown} />
            <ul className="dropdown-content" style={Styles}>
                <li>  <Link to="/admin/profile"> <i className="large material-icons">account_circle</i> Profile</Link> </li>
                <li className="divider"></li>
                <li onClick={logout}> <span> Log out </span> </li>
            </ul>
        </div>
    }
}

export default UserSign;