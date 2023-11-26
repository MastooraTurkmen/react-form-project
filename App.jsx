import React from "react"
import { nanoid } from "nanoid"

export default function App() {

	function handleChange(event) {
		const { name, type, value, checked } = event.target

		function hijackResults() {
			let string = ""

			if (name === "firstName") {
				string = "Stinky"
			} else if (name === "lastName") {
				string = "McStinkerson"
			} else {
				string = "StinkyMcStinkerson@gmail.com"
			}

			return string.slice(0, value.length)
		}

		function switcharoo(event) {
			if (value === "no" && formData.privacyResponse === "yes") {
				return "absolutely"
			} else if (value === "no" && formData.privacyResponse === "absolutely") {
				return "yes"
			} else {
				return value
			}
		}

		let dataToRecord

		if (name === "firstName" || name === "lastName" || name === "email") {
			dataToRecord = hijackResults()
		} else if (type == "radio") {
			dataToRecord = switcharoo(event)
		} else {
			dataToRecord = type === "checkbox" ? checked : value
		}
		
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: dataToRecord
			}
		})
	}

	function fakeSubmit(e) {
		e.preventDefault()
		setFormData(prev => ({...formData, wantsToSubmit: !prev.wantsToSubmit}))
	}
	
	React.useEffect(() => {
		if (formData.rating !== "10") {
			setTimeout(() => {
				setFormData({ ...formData, rating: "10" })
			}, 2000)
		}

		if (!formData.marketingResponse) {
			setTimeout(() => {
				setFormData({ ...formData, rating: "10", marketingResponse: true })
			}, 2000)
		}
	}) 

	const [formData, setFormData] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		privacyResponse: "yes",
		rating: "10",
		marketingResponse: true,
		wantsToSubmit: false
	})

	return (
		<form onSubmit={fakeSubmit}>
			<h1>The World's Most Annoying Form</h1>
			
			<input
				type="text"
				placeholder="First Name"
				onChange={handleChange}
				name="firstName"
				value={formData.firstName}
			/>
			
			<input
				type="text"
				placeholder="Last Name"
				onChange={handleChange}
				name="lastName"
				value={formData.lastName}
			/>
			
			<input
				type="email"
				placeholder="Email"
				onChange={handleChange}
				name="email"
				value={formData.email}
			/>

			<fieldset>
				<legend>
					Would you like to sign away all of the rights to your privacy?
				</legend>
				<div className="privacy-container">
					<label>
						<input
							type="radio"
							id="yes"
							name="privacyResponse"
							value="yes"
							checked={formData.privacyResponse === "yes"}
							onChange={handleChange}
						/>
						Yes!
					</label>

					<label>
						<input
							type="radio"
							id="no"
							name="privacyResponse"
							value="no"
							checked={formData.privacyResponse === "no"}
							onChange={handleChange}
						/>
						No.
					</label>

					<label>
						<input
							type="radio"
							id="absolutely"
							name="privacyResponse"
							value="absolutely"
							checked={formData.privacyResponse === "absolutely"}
							onChange={handleChange}
						/>
						Absolutely!
					</label>
				</div>
			</fieldset>

			<fieldset className="rating-container">
				<legend>
					On a scale of 1-10, with 1 being the worst and 10 being the best, how would you rate this form?
				</legend>
				
				<select 
					onChange={handleChange} 
					name="rating"
					value={formData.rating}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
					
				</select>
				
			</fieldset>

			<label className="marketing-label">
			
				<input
					type="checkbox"
					name="marketingResponse"
					checked={formData.marketingResponse}
					onChange={handleChange}
				/>
				
				<div className="checkmark"></div>
				<span>I would like to receive 20 marketing emails per day. </span>
			</label>

			<button
				className={formData.wantsToSubmit ? "move" : ""}
				onFocus={fakeSubmit}
				onMouseEnter={fakeSubmit}
			>
				Submit
			</button>
		</form>
	)
}
