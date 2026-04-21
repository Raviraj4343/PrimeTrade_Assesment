const Loader = ({ label = 'Loading...' }) => (
  <div className="loader-card">
    <div className="loader-spinner" />
    <p>{label}</p>
  </div>
);

export default Loader;
