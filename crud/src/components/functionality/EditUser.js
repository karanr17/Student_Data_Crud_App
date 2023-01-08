import React, { useEffect, useState } from 'react';
import { Box, TextField, styled, Button, Typography, Modal } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

//api
import { getUser, editUser } from '../../api/api';

//---------------------------------------------------------------------------------------------------//

const FormBox = styled(Box)`
	width: 30%;
	padding: 40px 5px 40px 5px;
	margin: 90px auto 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const Input = styled(TextField)`
	margin-bottom: 15px;
`

const SubmitBtn = styled(Button)`
	width: 225px;
	background-color: #46667C;
	:hover {
		background-color: #355062;
	}
`
const Header = styled(Typography)`
	color: #355062;
	margin-bottom: 40px;
	font-weight: 600;
`

const FormBody = styled(FormBox)`
	background-color: #E3EDF5;
`

const initial = {
	name: '',
	eng: '',
	maths: '',
	science: '',
	hindi: '',
	marathi: ''
}

const EditUser = () => {
	const [student, setStudent] = useState(initial);
	const { id } = useParams();

	useEffect(() => {
		getUserDetails();
	}, [])

	// const navigate = useNavigate();

	const handleName = (e) => {
		setStudent({ ...student, [e.target.name]: (e.target.value) });
	}

	const handleChange = (e) => {
		setStudent({ ...student, [e.target.name]: parseInt(e.target.value) });
	}

	const handleSubmit = async () => {
		await editUser(id, student);
	}

	const getUserDetails = async () => {
		let res = await getUser(id);
		setStudent(res.data);
	}

	return (
		<Modal
			open={true}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<FormBody >
				<Header variant='h4'>EDIT DATA</Header>
				<form >
					<Input id='name' name='name' type='text' onChange={(e) => handleName(e)} value={student.name} size='small' variant='outlined' label='Student Name' /><br />
					<Input id='eng' name='eng' type='number' onChange={(e) => handleChange(e)} value={student.eng} size='small' variant='outlined' label='English' /><br />
					<Input id='maths' name='maths' type='number' onChange={(e) => handleChange(e)} value={student.maths} size='small' variant='outlined' label='Maths' /><br />
					<Input id='science' name='science' type='number' onChange={(e) => handleChange(e)} value={student.science} size='small' variant='outlined' label='Science' /><br />
					<Input id='hindi' name='hindi' type='number' onChange={(e) => handleChange(e)} value={student.hindi} size='small' variant='outlined' label='Hindi' /><br />
					<Input id='marathi' name='marathi' type='number' onChange={(e) => handleChange(e)} value={student.marathi} size='small' variant='outlined' label='Marathi' /><br />

					<Box style={{ marginTop: 20 }}>
						<SubmitBtn onClick={() => handleSubmit()} component={Link} to={`/`} type='submit' variant='contained'>Edit Data</SubmitBtn>
					</Box>

				</form>
			</FormBody>
		</Modal>
	)
}

export default EditUser;