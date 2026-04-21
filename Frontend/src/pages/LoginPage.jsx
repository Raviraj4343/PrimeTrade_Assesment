import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const loginFields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email address' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(values);
      navigate(location.state?.from || '/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell auth-page">
      <AuthForm
        description="Pick up where you left off, review your priorities, and get straight back into the flow."
        errorMessage={errorMessage}
        fields={loginFields}
        footerNote="Your session stays focused on the tasks that matter most."
        highlight="Fast sign-in with a cleaner, easier-to-scan layout."
        loading={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Sign In"
        title="Welcome back"
      />
      <p className="form-helper">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
};

export default LoginPage;
