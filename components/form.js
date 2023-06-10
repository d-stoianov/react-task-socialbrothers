import styles from '../styles/Form.module.scss';
import React, { useState } from 'react';

export default function Form({ onFormSubmit }) {
  const [imageName, setImageName] = useState("Kies bestand");
  const [imagePreview, setImagePreview] = useState("images/camera.svg");
  const [image, setImage] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");

  function handleImageUpload(event) {
    if (event !== undefined) {
      const file = event.target.files[0];
      setImage(file);
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleTitleChange(event) {
    const value = event.target.value;
    setFormTitle(value);
    setIsDisabled(value === "" || formDescription === "");
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setFormDescription(value);
    setIsDisabled(value === "" || formTitle === "");
  }

  function handleSubmit() {
    const postData = {
      title: formTitle,
      categoryId: 1, // deal with category
      description: formDescription,
      image: image,
      imageName: imageName,
    }

    // show loader (block interface)

    onFormSubmit(postData).then(() => {
      // post succeeded

      // hide loader
    });
  }

  return (
    <div className={styles.form}>
      <h1>Plaats een blog bericht</h1>

      <div className={styles.formElement}>
        <h3>Berichtnaam</h3>
        <input
          value={formTitle}
          placeholder='Geen titel'
          onChange={handleTitleChange}
        />
      </div>

      <div className={styles.formElement}>
        <h3>Categorie</h3>
        <input
          value={formCategory}
          placeholder='Geen categorie'
          onChange={event => setFormCategory(event.target.value)}
        />
      </div>

      <div className={styles.formElement}>
        <h3>Header afbeelding</h3>
        <div className={styles.imgUpload}>
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          <label maxLength={10} htmlFor="file-input">
            {imageName}
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
          value={formDescription}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <button disabled={isDisabled} onClick={handleSubmit}>
        Bericht aanmaken
      </button>
    </div>
  );
}
