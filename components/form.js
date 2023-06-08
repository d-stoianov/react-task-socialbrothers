import styles from '../styles/Form.module.scss'
import React, { useState } from 'react'

export default function Form() {

    const [imageName, setImageName] = useState("Kies bestand")
    const [imagePreview, setImagePreview] = useState("images/camera.svg")

    function handleImageUpload (event) {
        if (event !== undefined) {
            const file = event.target.files[0];
            setImageName(file.name)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className={styles.form}>
        <h1>Plaats een blog bericht</h1>

        <div className={styles.formElement}>
          <h3>Berichtnaam</h3>
          <input placeholder='Geen titel'/>
        </div>

        <div className={styles.formElement}>
          <h3>Categorie</h3>
          <input placeholder='Geen categorie'/>
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
          <textArea></textArea>
        </div>

        <button>Bericht aanmaken</button>
      </div>
    )
}