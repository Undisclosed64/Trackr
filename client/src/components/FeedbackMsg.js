const FeedbackMessage = ({ updatedMsg, error }) => {
  if (updatedMsg) {
    return (
      <div className="success-message">
        <p>{updatedMsg}</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  } else {
    return null;
  }
};
export default FeedbackMessage;
