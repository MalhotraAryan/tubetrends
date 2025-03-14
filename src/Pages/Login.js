
// create a react component for login/signup form
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Components/Form";
export default function Login(props) {

    return (
        <div className="login">
            <Form user={props.user} setUser={props.setUser} />
        </div>
    );
}

