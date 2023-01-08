import { Box, Paper, Table, TableCell, TableContainer, TableHead, styled, TableRow, TableBody, Button, FormControl, InputLabel, Select, MenuItem, Input, TableFooter, Typography, useTheme, useMediaQuery, Dialog, DialogTitle, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./Table.module.css";

//api
import { getUsers, getUserByPage, deleteUser, getSortByName, getSortByRoll, searchName, getAllUsers } from '../api/api';

//---------------------------------------------------------------------------------------------------//

const Head = styled(TableRow)`
	background-color: #355062;
	& > th {
		color: #fff;
		font-size: 16px;
		font-weight: 600;
	}
`

const Btn = styled(Button)`
	margin: 0;
	padding: 0;
`

const SortBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex-start;

`
const Footer = styled(TableFooter)`
	background: #E5F0F7;
`
const Search = styled(Input)`
	margin-left: 20px;
	margin-bottom: 10px;
`
const FooterBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`
const Wrapper = styled(TableContainer)`
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
				rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;`

const SortBtn = styled(FormControl)`
	width: 20%;
	margin-left: 20px;
	margin-bottom: 10px; 
`

const TableData = () => {
	const [students, setStudents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [all, setAll] = useState([]);
	const [sort, setSort] = useState('');
	const [search, setSearch] = useState('');
	const [searchData, setSearchData] = useState([]);

	const totalPage = Math.ceil(all.length / 5);
	let disableLeft = (currentPage === 1 ? true : false)
	let disableRight = (currentPage === totalPage ? true : false)

	//---------------------------------------- M O D A L -----------------------------------------//

	const [open, setOpen] = useState(false);
	const [delId, setDelId] = useState(0);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClose = () => {
		setOpen(false);
	}

	const handleDelete = async () => {
		await deleteUser(delId);
		setOpen(false);
		getStudents();
		setCurrentPage(1);
	};

	//--------------------------------------------------------------------------------------------//

	const deleteHandler = (id) => {
		setDelId(id);
		setOpen(true);
	}

	const nextHandler = async () => {
		if (sort === 'student') {
			let res = await getSortByName(currentPage + 1);
			setStudents(res.data);
		} else if (sort === 'id') {
			let res = await getSortByRoll(currentPage + 1);
			setStudents(res.data);
		} else {
			let res = await getUsers(currentPage + 1);
			setStudents(res.data);
		}
		setCurrentPage(currentPage + 1);
		console.log('page is ' + currentPage);
	}
	const prevHandler = async () => {
		if (sort === 'student') {
			let res = await getSortByName(currentPage - 1);
			setStudents(res.data);
		} else if (sort === 'id') {
			let res = await getSortByRoll(currentPage - 1);
			setStudents(res.data);
		} else {
			let res = await getUsers(currentPage - 1);
			setStudents(res.data);
		}
		setCurrentPage(currentPage - 1)
		console.log(currentPage);
	}

	const emptyRows =
		currentPage === totalPage ? Math.max(0, (5 - students.length)) : 0;
	console.log(emptyRows);

	const handleChange = (event) => {
		setSort(event.target.value);
	};

	useEffect(() => {
		getStudents();
		setCurrentPage(1);
	}, [])

	const onChangeSearch = async (e) => {
		console.log(e.target.value);
		debugger;
		if (search.length === 1) {
			let res = await getUserByPage(currentPage);
			setStudents(res.data);
		} else {
			let res = await searchName(currentPage);
			setSearchData(res.data);
			console.log(searchData);
			provideSearchValue(e.target.value, res.data);
		}
	}

	const provideSearchValue = (searchValue, searchData) => {
		const result = searchData.filter((data) => {
			return (data.name.toLowerCase().includes(searchValue.toLowerCase()))
		})
		console.log(result);
		setStudents(result);
	}

	const handleSearch = async (e) => {
		e.preventDefault();
		let res = await searchName(search, currentPage)
		setStudents(res.data);
	}

	const getStudents = async () => {
		let res = await getUsers();
		setStudents(res.data);
		let allData = await getAllUsers();
		setAll(allData.data);
	}

	const handleSort = async (value) => {
		if (value === 'student') {
			let res = await getSortByName();
			setStudents(res.data);
		} else if (value === 'id') {
			let res = await getSortByRoll();
			setStudents(res.data);
		}
	}

	const totalMarks = (eng, maths, sci, hindi, mar) => {
		return eng + maths + sci + hindi + mar;
	}

	const totalGrade = (eng, maths, sci, hindi, mar) => {
		const total = (((eng + maths + sci + hindi + mar) / 500) * 100).toFixed(2);
		return gradeHandler(total);
	}

	const labelHandler = (eng, maths, sci, hindi, mar) => {
		const total = (((eng + maths + sci + hindi + mar) / 500) * 100).toFixed(2);
		if (total > 80) {
			return styles.green_bg;
		} else if (total > 50 && total <= 80) {
			return styles.yellow_bg;
		} else if (total < 50) {
			return styles.red_bg;
		}
	}

	const gradeHandler = (marks) => {
		if (marks > 90) {
			return 'A+';
		} else if (marks > 80 && marks <= 90) {
			return 'A';
		} else if (marks > 70 && marks <= 80) {
			return 'B';
		} else if (marks > 60 && marks <= 70) {
			return 'B';
		} else if (marks > 50 && marks <= 60) {
			return 'C';
		} else if (marks < 50) {
			return 'Third Class'
		}
	}

	return (
		<Box style={{ marginTop: 15, width: 1000 }}>
			<SortBox>
				<SortBtn size='small' fullWidth>
					<InputLabel id="demo-simple-select-label">Sort</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={sort}
						label="Sort By"
						onChange={handleChange}
					>
						<MenuItem onClick={() => handleSort('student')} value={'student'}>By Name</MenuItem>
						<MenuItem onClick={() => handleSort('id')} value={'id'}>By Roll No</MenuItem>
					</Select>
				</SortBtn>

				<form onSubmit={(e) => handleSearch(e)}>
					<Search placeholder='Search By Name' type='text' onChange={onChangeSearch} size='small' />
				</form>

			</SortBox>

			<Wrapper component={Paper}>
				<Table>
					<TableHead>
						<Head>
							<TableCell align='center'>Roll No</TableCell>
							<TableCell align='center'>Studnet Name</TableCell>
							<TableCell align='center'>English</TableCell>
							<TableCell align='center'>Maths</TableCell>
							<TableCell align='center'>Science</TableCell>
							<TableCell align='center'>Hindi</TableCell>
							<TableCell align='center'>Marathi</TableCell>
							<TableCell align='center'>Total</TableCell>
							<TableCell align='center'>Percent</TableCell>
							<TableCell align='center'>Grade</TableCell>
							<TableCell align='center'></TableCell>
						</Head>
					</TableHead>
					<TableBody>
						{students.map((std) => (
							<TableRow className={
								labelHandler(std.eng, std.maths, std.science, std.hindi, std.marathi)
							} key={std.id}>
								<TableCell align='center'>{std.id}</TableCell>
								<TableCell align='center'>{std.name}</TableCell>
								<TableCell align='center'>{std.eng}</TableCell>
								<TableCell align='center'>{std.maths}</TableCell>
								<TableCell align='center'>{std.science}</TableCell>
								<TableCell align='center'>{std.hindi}</TableCell>
								<TableCell align='center'>{std.marathi}</TableCell>
								<TableCell align='center'>
									{totalMarks(std.eng, std.maths, std.science, std.hindi, std.marathi)} / 500
								</TableCell>
								<TableCell align='center'>
									{((totalMarks(std.eng, std.maths, std.science, std.hindi, std.marathi) / 500) * 100).toFixed(2)} %
								</TableCell>
								<TableCell align='center'>{
									totalGrade(std.eng, std.maths, std.science, std.hindi, std.marathi)
								}</TableCell>
								<TableCell align='center'>{<>
									<Btn size='small' component={Link} to={`/edit/${std.id}`} ><EditIcon /></Btn>
									<Btn onClick={() => deleteHandler(std.id)} color='error' size='small'><DeleteIcon /></Btn>
								</>}
								</TableCell>

								<Dialog
									style={{
										marginTop: 30
									}}
									PaperProps={{
										style:
											{ boxShadow: 'none' }
									}}
									fullScreen={fullScreen}
									open={open}
									onClose={handleClose}
									aria-labelledby="responsive-dialog-title"
								>
									<DialogTitle id="responsive-dialog-title">
										{"Delete Data ?"}
									</DialogTitle>
									<DialogActions>
										<Button style={{ marginBottom: 10 }} variant='contained' size='small' autoFocus onClick={handleClose}>
											Cancel
										</Button>
										<Button style={{ marginBottom: 10 }} variant='contained' color='warning' size='small' onClick={handleDelete} autoFocus>
											Delete
										</Button>
									</DialogActions>
								</Dialog>

							</TableRow>
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 81 * emptyRows }}>
								<TableCell colSpan={11} />
							</TableRow>
						)}
					</TableBody>
					<Footer >
						<TableCell colSpan={11} align='right'>
							<FooterBox>
								<Typography style={{ marginRight: 22 }}>Page {currentPage} of {totalPage}</Typography>
								<Button disabled={disableLeft} onClick={() => prevHandler()}><NavigateBeforeIcon /></Button>
								<Button disabled={disableRight} onClick={() => nextHandler()}><NavigateNextIcon /></Button>
								{/* <Button onClick={() => setCurrentPage(currentPage+1)}><NavigateNextIcon /></Button>
								<Button >{currentPage}</Button> */}
							</FooterBox>
						</TableCell>
					</Footer>
				</Table>

			</Wrapper>
		</Box>
	)
}

export default TableData;

