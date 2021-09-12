import React, {useContext} from 'react'
import {AppBar, Avatar, Box, IconButton, Toolbar, Typography} from "@material-ui/core";
import {AuthContext} from "./context/authContext";
import {navigate} from "@reach/router";

const Header = () => {
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
                <Typography variant={"h5"} color={"primary"}>NITL</Typography>
                <Box ml={"auto"}>
                    {isAuthenticated ?
                        <IconButton variant={'text'} onClick={logout}>
                            <Avatar>{profile?.email?.substr(0, 2)}</Avatar>
                        </IconButton>
                        : <IconButton variant={'text'} onClick={() => navigate('/login')}>
                            Login
                        </IconButton>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;