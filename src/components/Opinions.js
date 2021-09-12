import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {gql, useMutation, useQuery} from "@apollo/client";
import CloseIcon from '@material-ui/icons/Close';
import Report from "./Report";

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
const OPINIONS = gql`
    query{
        post(slug:"613e05d6ad53912d9e7eba3d"){
            title
            description
            createdAt
            updatedAt
            reactions{
                likes{
                    totalDocs
                }
                comments{
                    totalDocs
                    docs{
                        _id
                        data
                        kind
                        reactions{
                            likes{
                                totalDocs
                            }
                            reports{
                                totalDocs
                            }
                        }
                    }
                }
                mylike{
                    _id
                    kind
                }
                mycomment{
                    _id
                    kind
                    data
                }
                myreport{
                    _id
                    kind
                    data
                }
            }
        }
    }
`;
const Opinions = () => {
    const {data, loading, error} = useQuery(OPINIONS)
    if (error) {
        return <Typography>{error?.message}</Typography>
    }
    if (loading) {
        return <CircularProgress/>
    }
    console.log(data)
    return (
        <Box>
            {data?.post?.reactions?.comments?.docs?.map((op, key) => {
                return (
                    <Item reaction={op} key={key}/>
                )
            })}
            <CreateOpinion post={data?.post}/>
        </Box>
    )
};

const Item = ({reaction}) => {
    return (
        <Box display={"flex"} alignItems={"center"}>
            <Typography variant='span'>{reaction?.data}</Typography>
            <Box display={"flex"} ml={"auto"} alignItems={"center"}>
                {/*<Comment reaction={reaction}/>*/}
                <Like reaction={reaction}/>
                <Report reaction={reaction}/>
            </Box>
        </Box>
    )
}

const DELETE_REACTION = gql`
    mutation($reaction:ID!){
        deleteReaction(reactionId:$reaction){
            _id
            user{
                _id
                name
            }
            kind
            data
        }
    }
`;

const Like = ({reaction}) => {
    const [addReaction, {data, loading, error}] = useMutation(CREATE_OPINION);
    const [deleteReaction, {loading: deleteLoading}] = useMutation(DELETE_REACTION);
    const [liked, setLiked] = useState(reaction?.reactions?.mylike ?? false)
    const [count, setCount] = useState(reaction?.reactions?.likes?.totalDocs ?? '')
    const submitForm = (e) => {
        e.preventDefault();
        if (liked) {
            deleteReaction({variables: {reaction: reaction?._id}})
                .then(({data}) => {
                    setLiked(false);
                    setCount(p => p - 1);
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            addReaction({
                variables: {
                    kind: "like",
                    reaction: reaction?._id
                }
            })
                .then(({data}) => {
                    console.log(data)
                    setLiked(true)
                    setCount(p => p + 1);
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
    return (
        <Box>
            <IconButton onClick={submitForm} disabled={loading || deleteLoading}>
                <ThumbUpIcon color={!liked ? '' : 'secondary'}/>
            </IconButton>
            {count && count > 0 ? count : ''}
        </Box>
    )
}

const Comment = ({reaction}) => {
    const [addReaction, {data, loading, error}] = useMutation(CREATE_OPINION);
    const submitForm = (e) => {
        e.preventDefault();
        addReaction({
            variables: {
                kind: "comment",
                reaction: reaction?._id,
                data: ""
            }
        })
            .then(({data}) => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <Box>
            <IconButton onClick={submitForm}>
                <CommentIcon/>
            </IconButton>
        </Box>
    )
}

export const CREATE_OPINION = gql`
    mutation($post:ID, $kind:String, $data:String, $reaction:ID){
        createReaction(reactionInput:{
            post:$post,
            reaction:$reaction,
            kind:$kind,
            data:$data
        }){
            _id
            user{
                _id
                name
            }
            kind
            data
        }
    }
`;

const CreateOpinion = ({post}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [addReaction, {data, loading, error}] = useMutation(CREATE_OPINION);
    const [selected, setSelected] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        addReaction({
            variables: {
                post: post?._id,
                kind: "comment",
                data: selected
            }
        })
            .then(({data}) => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <Box display={"flex"} p={1}>
            <TextField label={"Add your opinion"} disabled={true}
                       onClick={() => setOpen(true)}
                       className={classes.inputText}/>
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
                                {post?.options?.map((o, key) => {
                                    return <Typography onClick={() => setSelected(o)} key={key}>
                                        {o}
                                    </Typography>
                                })}
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    <Typography className={classes.opinion} variant={"h5"}>
                        {selected?.length > 0 ? selected : 'Your opinion'}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Opinions;