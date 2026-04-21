import { useState } from 'react';
import Alert from '../common/Alert.jsx';

const PasswordToggleIcon = ({ visible }) =>
  visible ? (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M3 5.27 18.73 21l1.27-1.27-2.74-2.74A12.52 12.52 0 0 0 21 12s-3-6-9-6c-1.55 0-2.94.4-4.15 1.02L4.27 3.45 3 4.73Zm8.14 8.14a2 2 0 0 1-2.57-2.57ZM12 9a3 3 0 0 1 3 3c0 .34-.06.66-.16.96l-3.8-3.8c.3-.1.62-.16.96-.16Zm0-5C6 4 3 12 3 12a16.4 16.4 0 0 0 4.07 4.91l1.43-1.43A12.4 12.4 0 0 1 5.1 12S7.52 7 12 7c.97 0 1.86.2 2.67.52l1.6-1.6A9.3 9.3 0 0 0 12 4Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 5c6 0 9 7 9 7s-3 7-9 7-9-7-9-7 3-7 9-7Zm0 2C7.66 7 5.28 11.03 5.03 11.47 5.3 11.9 7.75 17 12 17s6.7-5.1 6.97-5.53C18.72 11.03 16.34 7 12 7Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Zm0 2A.5.5 0 1 0 12.5 12a.5.5 0 0 0-.5-.5Z"
        fill="currentColor"
      />
    </svg>
  );

const createInitialState = (fields) =>
  fields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: '' }), {});

const AuthForm = ({
  title,
  eyebrow = 'Authentication',
  description,
  highlight,
  footerNote,
  submitLabel,
  fields,
  onSubmit,
  loading,
  errorMessage
}) => {
  const initialState = createInitialState(fields);
  const [formState, setFormState] = useState(initialState);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = (event) => {
    setFormState((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emptyField = fields.find((field) => !formState[field.name].trim());

    if (emptyField) {
      setValidationMessage(`${emptyField.label} is required`);
      return;
    }

    setValidationMessage('');
    await onSubmit(formState, () => setFormState(createInitialState(fields)));
  };

  const togglePasswordVisibility = (fieldName) => {
    setVisiblePasswords((current) => ({
      ...current,
      [fieldName]: !current[fieldName]
    }));
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <p className="section-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p className="auth-copy">{description}</p> : null}
      </div>
      {highlight ? <div className="auth-highlight">{highlight}</div> : null}
      <Alert type="error" message={validationMessage || errorMessage} />
      <form className="stack-form" onSubmit={handleSubmit}>
        {fields.map((field) => {
          const isPasswordField = field.type === 'password';
          const isVisible = visiblePasswords[field.name];

          return (
            <label className="auth-field" htmlFor={field.name} key={field.name}>
              <span className="auth-label">{field.label}</span>
              <div className={isPasswordField ? 'input-shell has-toggle' : 'input-shell'}>
                <input
                  id={field.name}
                  name={field.name}
                  type={isPasswordField && isVisible ? 'text' : field.type}
                  placeholder={field.placeholder}
                  value={formState[field.name]}
                  onChange={handleChange}
                />
                {isPasswordField ? (
                  <button
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility(field.name)}
                    type="button"
                  >
                    <PasswordToggleIcon visible={isVisible} />
                  </button>
                ) : null}
              </div>
            </label>
          );
        })}
        <button disabled={loading} type="submit">
          {loading ? 'Please wait...' : submitLabel}
        </button>
      </form>
      {footerNote ? <p className="auth-footnote">{footerNote}</p> : null}
    </div>
  );
};

export default AuthForm;
