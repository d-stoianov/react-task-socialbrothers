import styles from '../styles/Form.module.scss'

export default function Form() {
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
            <label maxLength={10} htmlFor="file-input">
              <input id="file-input" type="file"accept="image/*"/>
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