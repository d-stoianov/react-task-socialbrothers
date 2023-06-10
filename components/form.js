import styles from '../styles/Form.module.scss'
import React, { useState, useRef } from 'react'

export default function Form({ onFormSubmit }) {
    const [imageName, setImageName] = useState("Kies bestand")
    const [imagePreview, setImagePreview] = useState("images/camera.svg")
    const [image, setImage] = useState()
    const formTitle = useRef("")
    const formCategory = useRef("")
    const formDescription = useRef("")

    function handleImageUpload (event) {
        if (event !== undefined) {
            const file = event.target.files[0];
            setImage(file)
            setImageName(file.name)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    async function handleSubmit() {
      const postData = {
        title: formTitle.current.value,
        categoryId: 1, // deall with category
        description: formDescription.current.value,
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
          <input ref={formTitle} placeholder='Geen titel'/>
        </div>

        <div className={styles.formElement}>
          <h3>Categorie</h3>
          <input ref={formCategory} placeholder='Geen categorie'/>
        </div>

        <div className={styles.formElement}>
          <h3>Header afbeelding</h3>
          <div className={styles.imgUpload}>
            {imagePreview &&
              <img src={imagePreview}/>
            }
            <label maxLength={10} htmlFor="file-input">
              {imageName}
              <input id="file-input" type="file" onChange={handleImageUpload} accept="image/*"/>
            </label>
          </div>
        </div>

        <div className={styles.formElement}>
          <h3>Bericht</h3>
          <textArea ref={formDescription}></textArea>
        </div>

        <button onClick={handleSubmit}>Bericht aanmaken</button>
      </div>
    )
}