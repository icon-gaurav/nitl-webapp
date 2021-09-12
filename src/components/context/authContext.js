import React, {createContext, useContext, useEffect, useState,} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import {NOTIFICATION_SEVERITIES, NotificationContext} from "./notificationContext";
import {navigate} from "@reach/router";


export const AuthContext = createContext();

export const ME = gql`
    query ME {
        me{
            _id
            email
            name
            createdAt
            updatedAt
            username
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LOGIN($email:String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
            name
            createdAt
            updatedAt
            username
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation LOGOUT {
        logout
    }
`;

export default function AuthProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const {error, loading:profileLoading, data} = useQuery(ME);

    const [logoutMutation] = useMutation(LOGOUT_MUTATION);
    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const {showNotification} = useContext(NotificationContext);
    useEffect(() => {
        if (profile) {
            localStorage['profile'] = JSON.stringify(profile);
        }
    }, [profile]);

    useEffect(() => {
        if (data?.me) {
            setProfile(data?.me);
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            setProfile(undefined);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, [data])

    // Check if profile already exists on localstorage
    // useEffect(() => {
    //     const p = localStorage['profile'];
    //     try {
    //         if (p){}
    //             // me();
    //     } catch {
    //         setProfile(undefined);
    //         setIsAuthenticated(false);
    //     }
    // }, [])

    async function logout() {
        try {
            const res = await logoutMutation();
            await navigate('/')
            setProfile(undefined);
            setIsAuthenticated(false);
            localStorage.clear();
            showNotification('Logged out successfully', NOTIFICATION_SEVERITIES.SUCCESS);
        } catch (e) {
            showNotification(e?.message, NOTIFICATION_SEVERITIES.WARNING);
        }
    }

    async function login(email, password) {
        try {
            const res = await loginMutation({variables: {email: email, password: password}});
            await navigate('/');
            setIsAuthenticated(true);
            setProfile(res?.data?.login);
            showNotification('Login successful', NOTIFICATION_SEVERITIES.SUCCESS);
            return 0;
        } catch (e) {
            showNotification(e?.message, NOTIFICATION_SEVERITIES.ERROR);
            return 1;
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            profile,
            setProfile,
            logout,
            login,
            loading
        }} {...props} />
    )
}
