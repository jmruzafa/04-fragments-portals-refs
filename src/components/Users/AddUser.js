import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();
	
	const [error, setError] = useState();

	const addUserHanlder = (event) => {
		
		event.preventDefault();

		//refs -> allows to collect values from the elements
		const enteredName =nameInputRef.current.value;
		const enteredAge =ageInputRef.current.value;
				
		if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: "Invalid input",
				message: "Please enter a valid name and age (non-empty values).",
			});
			return;
		}
		//adding this "+" in JS we are sure it will be treated as a number
		if (+enteredAge < 1) {
			setError({
				title: "Invalid input",
				message: "Please enter a valid age (> 0).",
			});
			return;
		}
		props.onAddUser(enteredName, enteredAge);
		//avoid to manipulate DOM without using React
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
	};

	const errorHandler = () => {
		setError(null);
	};
	return (
		//react does not allow side by side components at the root element
		//so we have to wrap them
		<Wrapper>
			{/*this will hide the component if error is empty */}
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHanlder}>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						type='text'
						ref={nameInputRef}
					/>
					<label htmlFor='age'>Age (Years)</label>
					<input
						id='age'
						type='number'
						ref={ageInputRef}
					/>
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;
