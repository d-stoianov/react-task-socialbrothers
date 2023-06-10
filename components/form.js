import styles from '../styles/Form.module.scss';
import React, { useEffect, useState } from 'react';

export default function Form({ categories, onFormSubmit }) {
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("images/camera.svg");
  const [image, setImage] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formTitle, setFormTitle] = useState("");
  const [formCategoryId, setformCategoryId] = useState(null);
  const [formDescription, setFormDescription] = useState("");

  const maxDescriptionLength = 300

  const defaultImagePath = "images/post.png"
  // set default image
  useEffect(() => {
    fetch(defaultImagePath)
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], "default-image.png", { type: "image/png" })
        setImage(file)
        setImageName(file.name)
      })
  }, [])

  function handleImageUpload(event) {
    if (event !== undefined) {
      const file = event.target.files[0];
      if (file !== undefined) {
        setImage(file);
        setImageName(file.name);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  function handleTitleChange(event) {
    const value = event.target.value;
    setFormTitle(value);
    setIsDisabled(value === "" || formDescription === "" || formCategoryId === null);
  }

  function handleCategoryIdChange(event) {
    const value = event.target.value;
    setformCategoryId(value);
    setIsDisabled(value === null || formDescription === "" || formTitle == "");
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setFormDescription(value);
    setIsDisabled(value === "" || formTitle === "" || formCategoryId === null);
  }

  function handleSubmit() {
    const postData = {
      title: formTitle,
      categoryId: formCategoryId,
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
        <div className={styles.dropdown}>
          {/* change this */}
          {formCategoryId ? 
            <select value={formCategoryId}
            onChange={handleCategoryIdChange}>
              <option selected={true} disabled={true} defaultValue="">Geen categorie</option>
              {categories.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })}
            </select>
            : <select value={formCategoryId} className={styles.chosen}
            onChange={handleCategoryIdChange}>
              <option selected={true} disabled={true} defaultValue="">Geen categorie</option>
              {categories.map(category => {
                return <option style={{ color: 'black'}} key={category.id} value={category.id}>{category.name}</option>
              })}
            </select>
          }
          <img className={styles.arrow} src="images/dropdown-arrow.svg" />
        </div>      
      </div>

      <div className={styles.formElement}>
        <h3>Header afbeelding</h3>
        <div className={styles.imgUpload}>
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          <label maxLength={10} htmlFor="file-input">
          {imageName === "default-image.png" ? "Kies bestand" : imageName}
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
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      {formDescription.length} / {maxDescriptionLength}
      <button disabled={isDisabled} onClick={handleSubmit}>
        Bericht aanmaken
      </button>
    </div>
  );
}
