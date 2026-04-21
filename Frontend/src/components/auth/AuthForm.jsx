import { useState } from 'react';
import Alert from '../common/Alert.jsx';

const AuthForm = ({
  title,
  submitLabel,
  fields,
  onSubmit,
  loading,
  errorMessage
}) => {
  const [formState, setFormState] = useState(
    fields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: '' }), {})
  );

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
    await onSubmit(formState, () =>
      setFormState(fields.reduce((accumulator, field) => ({ ...accumulator, [field.name]: '' }), {}))
    );
  };

  return (
    <div className="auth-card">
      <p className="section-kicker">Authentication</p>
      <h1>{title}</h1>
      <Alert type="error" message={validationMessage || errorMessage} />
      <form className="stack-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formState[field.name]}
            onChange={handleChange}
          />
        ))}
        <button disabled={loading} type="submit">
          {loading ? 'Please wait...' : submitLabel}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
