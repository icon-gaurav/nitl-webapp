import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

const useStyles = makeStyles((theme) => ({
    inputText: {
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        padding: '0px 10px',
        width: '100%',
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

    signUpText: {
        display: 'inline-block',
        margin: '0 5px',
    },

    logo: {
        height: '60px',
        paddingBottom: '70px',
        boxSizing: 'content-box',
    },
    postBtn: {
        backgroundColor: '#ffb700',
        color: 'black',
        borderRadius: 10,
        padding: '5px 15px'
    },
    accordion: {
        boxShadow: 'none'
    },
    opinion: {
        color: 'grey',
        fontSize: 13,
        fontWeight: '300'
    }
}));
const Report = ({opinion}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [selected, setSelected] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
    }
    return (
        <Box display={"flex"} p={1}>
            <IconButton Onclick={() => setOpen(true)}>
                <ReportProblemRoundedIcon/>
            </IconButton>
            <Dialog
                fullScreen={true}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <DialogTitle>
                    <Box display={"flex"} justifyContent={'space-between'} alignItems={"center"}>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </IconButton>
                        <Typography>Add opinion</Typography>
                        <Button onClick={submitForm} className={classes.postBtn}>
                            Post
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            className={classes.summary}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>What do you support?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography onClick={() => setSelected('Option 1')}>
                                    Option 1
                                </Typography>
                                <Typography onClick={() => setSelected('Option 2')}>
                                    Option 2
                                </Typography>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    <Typography className={classes.opinion} variant={"h5"}>
                        {selected?.length > 0 ? selected : 'your opinion'}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Report;