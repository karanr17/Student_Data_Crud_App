import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grade from './Grade';
import TableData from './TableData';


const Body = styled(Box)`
    width: 95%;
    margin: 1rem auto 0 auto;
    display: flex;
    align-itmes: center;
    justify-content: space-evenly;
`
const GradeBox = styled(Box)`
    width: 230px;
`
const TableBox = styled(Box)`
    width: 950px;
`
const BoxBtn = styled(Box)`
    padding-left: 40px;
`

const AddBtn = styled(Button)`
    width: 150px;
    height: 45px;
    background-color: #46667C;
    margin: 40px auto 0 auto;
	:hover {
		background-color: #355062;
	}
`

const Home = () => {

    const navigate = useNavigate();

    const addHandler = () => {
        navigate('/add')
    }

    return (
        <Box>
            <Body>
                <GradeBox>
                    <Typography style={{ marginBottom: 67, fontWeight: 400 }} align='center' variant='h4' >Grade System</Typography>
                    <Grade />
                    <BoxBtn>
                        <AddBtn onClick={addHandler} variant='contained' >Add Data</AddBtn>
                    </BoxBtn>
                </GradeBox>
                <TableBox>
                    <Typography align='center' variant='h4' >Student Data</Typography>
                    <TableData />
                </TableBox>
            </Body>
        </Box>
    )
}

export default Home