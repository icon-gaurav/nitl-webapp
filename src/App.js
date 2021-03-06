import React from 'react';
import {Router} from "@reach/router"
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,} from "@apollo/client";
import AuthProvider from "./components/context/authContext";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import NotificationProvider from "./components/context/notificationContext";
import Header from "./components/Header";
import {Box, makeStyles} from "@material-ui/core";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {},
        },
    },
});

const uri = "http://localhost:3001/api/graphql";
const httpLink = new createHttpLink({
    uri,
    credentials: "include",
});

// const client = new ApolloClient({
//     link: httpLink,
//     cache :new InMemoryCache({}),
// });

const useStyles = makeStyles((theme) => ({
    container:{
        margin:0,
        [theme.breakpoints.up('sm')]:{
            marginLeft:"auto",
            marginRight:"auto",
            maxWidth:720
        }
    }
}));

function App() {
    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache({}),
    });
    const classes = useStyles();
    return (
        <NotificationProvider>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <Header/>
                    <Box className={classes.container}>
                        <Router style={{minHeight: '100vh', width:"100%"}}>
                            <Login path="/login"/>
                            <Register path="/register"/>
                            <HomePage path="/"/>
                        </Router>
                    </Box>
                </AuthProvider>

            </ApolloProvider>
        </NotificationProvider>
    );
}

export default App;
