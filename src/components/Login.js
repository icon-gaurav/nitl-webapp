import React, {useContext, useEffect, useState} from 'react';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {validateEmail} from "../utils";
import {navigate} from "@reach/router"
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
        // color: theme.palette.black.light0,
    },
    subtitle: {
        fontSize: '17px',
        lineHeight: '1.7rem',
        fontWeight: '400',
        // color: theme.palette.black.light1,
    },
    orText: {
        // color: theme.palette.light4,
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
        // color: theme.palette.black.light2,
        transition: 'all .2s ease-in-out',
        '&:hover': {
            // color: theme.palette.black.light0,
        }
    },
    signUpText: {
        display: 'inline-block',
        margin: '0 5px',
    },
    signUpLink: {
        cursor: 'pointer',
        '&:hover': {
            // color: theme.palette.primary.main,
            textDecoration: 'underline',
        }
    },
    logo: {
        height: '60px',
        paddingBottom: '70px',
        boxSizing: 'content-box',
    }
}));

export default function Login() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const classes = useStyles();
    const {login, isAuthenticated} = useContext(AuthContext);

    async function handleSubmit(e) {
        e?.preventDefault();
        setLoading(true);
        setIsSubmitClicked(true);

        if (!(isEmailValid && isPasswordValid)) return 0;

        if (await login(email, password) === 0) {
            // await router.push('/dashboard');

        }
        setLoading(false);
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
                            Sign in
                        </Typography>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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

                        <Button
                            type={'submit'}
                            disabled={loading}
                            className={classes.loginButton}
                            color={'primary'}
                            onClick={handleSubmit}
                            variant={'contained'}>
                            {loading ? "Login..." : "Login"}
                        </Button>

                            <Button
                                className={classes.loginButton}
                                color={'secondary'}
                                onClick={()=>navigate('/register')}
                                variant={'contained'}>
                                Create New account
                            </Button>

                    </Box>
                </Box>
            </form>
        </Box>
    )
}
