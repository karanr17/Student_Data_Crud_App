import React, { useState } from 'react';
import { Box, TextField, styled, Button, Typography, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//api
import { addUser } from '../../api/api';

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
const BodyBox = styled(Box)`
	margin-top: 40px;
	display: flex;
	align-items: center;
	justify-content: space-around;
`
const Header = styled(Typography)`
	color: #355062;
	margin-bottom: 40px;
	font-weight: 600;
`

const FormBody = styled(FormBox)`
	background-color: #E3EDF5;
`

const AddUser = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
			eng: '',
			maths: '',
			science: '',
			hindi: '',
			marathi: ''
		},
		onSubmit: async (values) => {
			addStudentDetails(values);
		}
	})

	const navigate = useNavigate();

	const addStudentDetails = async (data) => {
		await addUser(data);
		navigate('/');
	}

	return (
		<Modal
			open={true}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>

			<FormBody >
				<Header variant='h4'>ADD DATA</Header>
				<form onSubmit={formik.handleSubmit}>
					<Input required id='name' name='name' type='text' onChange={formik.handleChange} value={formik.values.name} size='small' variant='outlined' label='Student Name' /><br />
					<Input required id='eng' name='eng' type='number' onChange={formik.handleChange} value={formik.values.eng} size='small' variant='outlined' label='English' /><br />
					<Input required id='maths' name='maths' type='number' onChange={formik.handleChange} value={formik.values.maths} size='small' variant='outlined' label='Maths' /><br />
					<Input required id='science' name='science' type='number' onChange={formik.handleChange} value={formik.values.science} size='small' variant='outlined' label='Science' /><br />
					<Input required id='hindi' name='hindi' type='number' onChange={formik.handleChange} value={formik.values.hindi} size='small' variant='outlined' label='Hindi' /><br />
					<Input required id='marathi' name='marathi' type='number' onChange={formik.handleChange} value={formik.values.marathi} size='small' variant='outlined' label='Marathi' /><br />

					<Box style={{ marginTop: 20 }}>
						<SubmitBtn type='submit' variant='contained'>Add Data</SubmitBtn>
					</Box>

				</form>
			</FormBody>
		</Modal>
	)
}

export default AddUser