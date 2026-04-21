import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const registerFields = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Full name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email address' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await register(values);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell auth-page">
      <AuthForm
        description="Join the workspace to organize tasks, keep momentum visible, and move work forward without the noise."
        errorMessage={errorMessage}
        fields={registerFields}
        footerNote="Use at least one password you do not reuse elsewhere."
        highlight="Quick setup. Clear progress. One calm place to work."
        loading={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Create Account"
        title="Create your account"
      />
      <p className="form-helper">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
