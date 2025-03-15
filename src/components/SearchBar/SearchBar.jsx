import { Formik, Form, Field } from "formik";
import { FaSearch } from "react-icons/fa";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <header className={css.searchBar}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSubmit(values.query, actions.resetForm);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.inputWrapper}>
            <button
              type="submit"
              className={css.searchButton}
              aria-label="Search"
              disabled={isSubmitting}
            >
              <FaSearch className={css.searchIcon} size={18} />
            </button>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
}
