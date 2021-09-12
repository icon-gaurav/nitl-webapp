import React, {useContext} from 'react'
import {AppBar, Avatar, IconButton, Toolbar} from "@material-ui/core";
import {AuthContext} from "./context/authContext";
import {navigate} from "@reach/router";

const Header = ()=>{
    const {
        profile,
        isAuthenticated,
        logout,
    } = useContext(AuthContext);
    return (
        <AppBar
            position={'sticky'}
            style={{boxShadow: "0px 4px 50px #00000021", backgroundColor: "white"}}
            variant={'elevation'}>
            <Toolbar>
                {isAuthenticated ?
                        <IconButton variant={'text'} onClick={logout}>
                            <Avatar>{profile?.email?.substr(0, 2)}</Avatar>
                        </IconButton>
                    :  <IconButton variant={'text'} onClick={()=> navigate('/login')}>
                        Login
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;