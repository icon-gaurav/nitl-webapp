import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
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
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import {useMutation} from "@apollo/client";
import {CREATE_OPINION} from "./Opinions";

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
    },
    optionItem: {
        borderRadius: 10,
        backgroundColor: '#fdfaf1',
        margin: "2px 0",
        padding: "10px 10px"
    }
}));
const Report = ({reaction}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [addReaction, {data, loading, error}] = useMutation(CREATE_OPINION);
    const [selected, setSelected] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        addReaction({
            variables: {
                reaction: reaction?._id,
                kind: "report",
                data: selected
            }
        })
            .then(({data}) => {
                console.log(data)
                setOpen(false)
            })
            .catch(e => {
                console.log(e)
            })
    }
    const reportOptions = ['Spam', 'Contains hate speech'];
    return (
        <Box display={"flex"} p={1}>
            <IconButton onClick={() => setOpen(true)}>
                <ReportProblemRoundedIcon fontSize={"small"}/>
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
                        <Typography>Report Comment</Typography>
                        <Button onClick={submitForm} className={classes.postBtn} disabled={selected?.length <= 0}>
                            Post
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Accordion className={classes.accordion}>
                        {/*<AccordionSummary*/}
                        {/*    className={classes.summary}*/}
                        {/*    expandIcon={<ExpandMoreIcon/>}*/}
                        {/*    aria-controls="panel1a-content"*/}
                        {/*    id="panel1a-header"*/}
                        {/*>*/}
                        {/*    <Typography className={classes.heading}>What do you support?</Typography>*/}
                        {/*</AccordionSummary>*/}
                        <AccordionDetails style={{padding: 0}}>
                            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                                {reportOptions?.map((r, key) => {
                                    return <Box key={key} className={classes.optionItem}
                                                style={{backgroundColor: selected === r ? '#f1ebff' : '#fdfaf1'}}>
                                        <Typography onClick={() => setSelected(r)} key={key}>
                                            {r}
                                        </Typography>
                                    </Box>
                                })}
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    {/*<Typography className={classes.opinion} variant={"h5"}>*/}
                    {/*    {selected?.length > 0 ? selected : 'your opinion'}*/}
                    {/*</Typography>*/}
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Report;