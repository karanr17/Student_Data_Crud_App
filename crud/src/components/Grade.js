import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';



const Head = styled(TableRow)`
	background-color: #355062;
	& > th {
		color: #fff;
		font-size: 16px;
        font-weight: 600;
	}
`
const Wrapper = styled(TableContainer)`
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
                rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`

const DataBox = styled(TableRow)`
    background: #E5F0F7;
`

function createData(percent, grade) {
    return { percent, grade };
}

const rows = [
    createData('90+', 'A+'),
    createData('80 - 90', 'A'),
    createData('70 - 80', 'B+'),
    createData('60 - 70', 'B'),
    createData('50 - 60', 'C'),
    createData('< 50', 'Third Class'),
];

const Grade = () => {
    return (
        <Box style={{ marginTop: 15 }}>
            <Wrapper component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <Head>
                            <TableCell align='center' >Percent</TableCell>
                            <TableCell align="center">Grade</TableCell>
                        </Head>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <DataBox
                                key={row.name}
                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center' component="th" scope="row">
                                    {row.percent}
                                </TableCell>
                                <TableCell align='center' component="th" scope="row">
                                    {row.grade}
                                </TableCell>
                            </DataBox>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
        </Box>
    )
}

export default Grade