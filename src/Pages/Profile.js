import React, { Component } from 'react'
import ProfileForm from "../Components/ProfileForm";
import NoUserFound from '../Components/NoUserFound';


export default class Profile extends Component {

    render() {
        const user = this.props.user;
        const setUser = this.props.setUser;
        if (user === null)
            return (<NoUserFound />);
        return (
            <div>
                <ProfileForm user={user} setUser={setUser} />

            </div>
        )
    }
}