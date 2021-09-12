import React, {useContext, useEffect, useState} from 'react';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {validateEmail} from "../utils";
import {AuthContext} from "./context/authContext";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import {Link, navigate} from '@reach/router'

const REGISTER_MUTATION = gql`
    mutation REGISTER_MUTATION($username:String!, $email:String!, $password:String!){
        register(username: $username, email: $email, password: $password){
            _id
            email
            name
            createdAt
            updatedAt
            username
        }
    }
`;
const useStyles = makeStyles((theme) => ({
    inputText: {
        borderRadius: 10,
        "& .MuiOutlinedInput-root": {
            borderRadius: 20,
        },
        marginBottom: 20,
        "& input": {
            height: "1.2rem",
            fontSize: "1rem",
        },
        "& label": {
            fontSize: "1em",
        }
    },
    title: {
        fontWeight: '500',
        fontSize: '30px',
        lineHeight: '4rem',
        textAlign: 'center',
        color: theme.palette.black.light0,
    },
    subtitle: {
        fontSize: '17px',
        lineHeight: '1.7rem',
        fontWeight: '400',
        color: theme.palette.black.light1,
    },
    orText: {
        color: theme.palette.light4,
        fontWeight: '500',
    },
    inputContainer: {
        margin: "0.3rem 0rem",
        width: "20rem"
    },
    loginButton: {
        margin: "1rem 0",
        padding: '10px',
        borderRadius: '30px',
        width: '60%'
    },
    customButton: {
        display: 'flex',
        justifyContent: 'unset',
        borderRadius: '100vw',
        padding: '10px',
        '& span': {
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    secondaryAction: {
        fontSize: '14px',
        fontWeight: '400',
        cursor: 'pointer',
        color: theme.palette.black.light2,
        transition: 'all .2s ease-in-out',
        '&:hover': {
            color: theme.palette.black.light0,
        }
    },
    signUpText: {
        display: 'inline-block',
        margin: '0 5px',
    },
    signUpLink: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        }
    },
    logo: {
        height: '60px',
        paddingBottom: '70px',
        boxSizing: 'content-box',
    }
}));

export default function Register() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [register, {data, loading, error}] = useMutation(REGISTER_MUTATION);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const classes = useStyles();
    const { isAuthenticated} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e?.preventDefault();
        setIsSubmitClicked(true);

        if (!(isEmailValid && isPasswordValid)) return 0;

        if (email?.length > 0 && password?.length > 0 && confirmPassword === password) {
            register({
                variables: {
                    username: email?.replace('@', '.'),
                    email,
                    password
                }
            })
                .then(({data}) => {
                    console.log(data);
                    navigate('/login').then(r => {
                    })
                        .catch(e => console.log)
                })
                .catch(e => {
                })

        }

    }

    function handleEmailChange(event) {
        setEmail(event.target.value);

        if (!validateEmail(event.target.value)) {
            setIsEmailValid(false);
            return 0;
        }
        setIsEmailValid(true);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);

        if (event.target.value.length < 1) {
            setIsPasswordValid(false);
            return 0;
        }
        setIsPasswordValid(true);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
                .then(() => {
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [isAuthenticated])

    return (
        <Box width={"100vw"} height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <form method={"post"} onSubmit={handleSubmit}>
                <Box display={"flex"} flexDirection={"column"}>
                    <Box>
                        <Typography variant={'body2'} className={classes.title}>
                            Sign up
                        </Typography>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                        {/*<FormControl className={classes.inputContainer}>*/}
                        {/*    <TextField label={"Username"} variant={"outlined"} value={email?.replace('@','.')}*/}
                        {/*               onChange={e => setUsername(e?.target?.value)}*/}
                        {/*               className={classes.inputText}*/}
                        {/*               disabled={true}*/}
                        {/*               // error={username?.length <= 0}*/}
                        {/*               // helperText={(username?.length <= 0) ? " Please enter a valid username" : ""}*/}
                        {/*    />*/}
                        {/*</FormControl>*/}
                        <FormControl className={classes.inputContainer}>
                            <TextField label={"Email Address"} variant={"outlined"} value={email}
                                       onChange={handleEmailChange}
                                       className={classes.inputText}
                                       error={isSubmitClicked && !isEmailValid}
                                       helperText={(isSubmitClicked && !isEmailValid) ? " Please enter a valid email" : ""}/>
                        </FormControl>

                        <FormControl className={classes.inputContainer}>
                            <TextField label={"Password"} variant={"outlined"} value={password}
                                       type={isPasswordHidden ? 'password' : 'text'}
                                       error={isSubmitClicked && !isPasswordValid}
                                       className={classes.inputText}
                                       onChange={handlePasswordChange}
                                       InputProps={{
                                           endAdornment:
                                               <InputAdornment position={'end'}>
                                                   <IconButton onClick={() => setIsPasswordHidden(p => !p)}>
                                                       {isPasswordHidden ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                                   </IconButton>
                                               </InputAdornment>
                                       }
                                       }
                                       helperText={(isSubmitClicked && !isPasswordValid) ? "Password is required*" : ""}/>

                        </FormControl>
                        <FormControl className={classes.inputContainer}>
                            <TextField label={"Retype Password"} variant={"outlined"} value={confirmPassword}
                                       type={'password'}
                                       error={password !== confirmPassword}
                                       className={classes.inputText}
                                       onChange={e => setConfirmPassword(e?.target?.value)}
                                // InputProps={{
                                //     endAdornment:
                                //         <InputAdornment position={'end'}>
                                //             <IconButton onClick={() => setIsPasswordHidden(p => !p)}>
                                //                 {isPasswordHidden ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                //             </IconButton>
                                //         </InputAdornment>
                                // }
                                // }
                                       helperText={(password !== confirmPassword) ? "Check your password again" : ""}/>

                        </FormControl>

                        <Button
                            type={'submit'}
                            disabled={loading}
                            className={classes.loginButton}
                            color={'primary'}
                            onClick={handleSubmit}
                            variant={'contained'}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <Link to={"/login"}>
                            <Button
                                className={classes.loginButton}
                                color={'secondary'}
                                variant={'contained'}>
                                Login
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
