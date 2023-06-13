import styles from '../styles/Form.module.scss'
import React, { useEffect, useState } from 'react'

export default function Form({ categories, onFormSubmit }) {
	const [imageName, setImageName] = useState("")
	const [imagePreview, setImagePreview] = useState("images/camera.svg")
	const [image, setImage] = useState(undefined)
	const [isDisabled, setIsDisabled] = useState(true)
	const [formTitle, setFormTitle] = useState("")
	const [formCategoryId, setformCategoryId] = useState(undefined)
	const [formDescription, setFormDescription] = useState("")

	const maxDescriptionLength = 300
	const defaultSelectValue = "Geen categorie"

	useEffect(() => {
		setIsDisabled(formCategoryId === "" || formDescription === "" ||
			formTitle === "" || image === undefined)
	}, [formCategoryId, formDescription, formTitle, image])

	function handleImageUpload(event) {
		if (event !== undefined) {
			const file = event.target.files[0]
			if (file !== undefined) {
				setImage(file)
				setImageName(file.name)
				setImagePreview(URL.createObjectURL(file))
			}
		}
	}

	async function handleSubmit() {
		const postData = {
			title: formTitle,
			categoryId: formCategoryId,
			description: formDescription,
			image: image,
			imageName: imageName,
		}

		// show loader (block interface)

		await onFormSubmit(postData)
		// post succeeded

		// hide loader

	}

	return (
		<div className={styles.form}>
			<h1>Plaats een blog bericht</h1>

			<div className={styles.formElement}>
				<h3>Berichtnaam</h3>
				<input
					value={formTitle}
					placeholder='Geen titel'
					onChange={event => setFormTitle(event.target.value)}
				/>
			</div>

			<div className={styles.formElement}>
				<h3>Categorie</h3>
				<div className={styles.dropdown}>
					<select defaultValue={defaultSelectValue} value={formCategoryId}
						onChange={event => setformCategoryId(event.target.value)} className={formCategoryId ? "" : styles.empty}>
						<option disabled={true}>Geen categorie</option>
						{categories.map(category => {
							return <option key={category.id} value={category.id}
								className={formCategoryId ? "" : styles.formOption}>{category.name}</option>
						})}
					</select>
					<img className={styles.arrow} src="images/dropdown-arrow.svg" />
				</div>
			</div>

			<div className={styles.formElement}>
				<h3>Header afbeelding</h3>
				<div className={styles.imgUpload}>
					{imagePreview && <img src={imagePreview} alt="Preview" />}
					<label maxLength={10} htmlFor="file-input">
						{imageName ? imageName : "Kies bestand"}
						<input
							id="file-input"
							type="file"
							onChange={handleImageUpload}
							accept="image/*"
						/>
					</label>
				</div>
			</div>

			<div className={styles.formElement}>
				<h3>Bericht</h3>
				<textarea
					maxLength={maxDescriptionLength}
					value={formDescription}
					onChange={event => setFormDescription(event.target.value)}
				></textarea>
			</div>
			{formDescription.length} / {maxDescriptionLength}
			<button disabled={isDisabled} onClick={handleSubmit}>
				Bericht aanmaken
			</button>
		</div>
	)
}