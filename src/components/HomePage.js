import React from 'react';
import {Box} from "@material-ui/core";
import Opinions from "./Opinions";

const HomePage = () => {
    return (
        <Box display={"flex"} justifyContent={"flex-end"} flexDirection={"column"} minHeight={'100vh'} p={1}>
            <Opinions/>
        </Box>
    );
};

export default HomePage;