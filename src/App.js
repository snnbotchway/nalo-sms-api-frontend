import "./App.css";

import * as React from "react";
import { useState } from "react";

// Import axios client
import axios from "axios";

// Import required MUI components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{"Copyright © "}
			<Link
				color="inherit"
				href="https://www.linkedin.com/in/solomon-botchway-a1383821b/">
				Solomon Botchway
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function App() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState(0);
	const [dlr, setDlr] = useState(1);
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const [message, setMessage] = useState("");
	const [key, setKey] = useState("");
	const [response, setResponse] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		// Activate backdrop:
		setOpen(true);

		let url = "";
		if (!key) {
			url = `https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message/?username=${username}&password=${password}&type=${type}&dlr=${dlr}&source=${source}&destination=${destination}&message=${message}`;
		} else {
			url = `https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message/?key=${key}&type=${type}&dlr=${dlr}&source=${source}&destination=${destination}&message=${message}`;
		}

		// Send request and set response accordingly
		axios
			.get(url)
			.then((response) => {
				setResponse(response.data);
			})
			.catch((AxiosError) => {
				setResponse(AxiosError.message);
			})
			.finally(() => {
				setOpen(false);
				window.scrollTo(0, 0); // Scroll to top so user sees the response alert
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
						<EmailIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Nalo SMS API Project
					</Typography>
					<Grid item xs={12} marginTop={2}>
						{/* Check if response starts with 1701 and display success alert */}
						{response && response.slice(0, 4) === "1701" && (
							<Alert severity="success">
								Message sent to {destination} successfully
							</Alert>
						)}
						{/* Check if response does not start with 1701 and display error alert */}
						{response && response.slice(0, 4) !== "1701" && (
							<Alert severity="error">{response}</Alert>
						)}
					</Grid>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							{!key && (
								<Grid item xs={12}>
									<TextField
										autoFocus
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
										onChange={(event) => {
											setUsername(event.target.value);
										}}
										value={username}
									/>
								</Grid>
							)}
							{!key && (
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="password"
										onChange={(event) => {
											setPassword(event.target.value);
										}}
										value={password}
									/>
								</Grid>
							)}

							{!username && !password && (
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="key"
										label="Key"
										type="password"
										id="key"
										autoComplete="key"
										helperText="No need for a Username and Password if you enter a key."
										onChange={(event) => {
											setKey(event.target.value);
										}}
										value={key}
									/>
								</Grid>
							)}

							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="source"
									name="source"
									required
									fullWidth
									id="source"
									label="Source"
									helperText="An approved Sender ID."
									onChange={(event) => {
										setSource(event.target.value);
									}}
									value={source}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="destination"
									label="Destination"
									name="destination"
									autoComplete="destination"
									onChange={(event) => {
										const regex = /^[0-9\b]+$/;
										if (
											event.target.value === "" ||
											regex.test(event.target.value)
										) {
											setDestination(event.target.value);
										}
									}}
									value={destination}
									helperText="Recipient's phone number."
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="message"
									label="Message"
									name="message"
									autoComplete="message"
									multiline
									minRows={3}
									maxRows={10}
									onChange={(event) => {
										setMessage(event.target.value);
									}}
									value={message}
									helperText="Your text message content."
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											checked={dlr === 1}
											value={1}
											color="primary"
											onChange={() => {
												if (dlr === 1) {
													setDlr(0);
												} else {
													setDlr(1);
												}
											}}
										/>
									}
									label="Request delivery report(DLR)."
								/>
							</Grid>
							<Grid item xs={12}>
								<FormLabel id="message-type">
									Message Type
								</FormLabel>
								<RadioGroup
									row
									value={type}
									onChange={(event) => {
										setType(event.target.value);
									}}>
									<FormControlLabel
										value={0}
										key={0}
										control={<Radio />}
										label="Text message"
									/>
									<FormControlLabel
										value={1}
										key={1}
										control={<Radio />}
										label="Flash message"
									/>
								</RadioGroup>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							endIcon={<SendIcon />}
							sx={{ mt: 3, mb: 2 }}>
							Send
						</Button>
						<Backdrop
							sx={{
								color: "#fff",
								zIndex: (theme) => theme.zIndex.drawer + 1,
							}}
							open={open}>
							<CircularProgress color="inherit" />
						</Backdrop>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
