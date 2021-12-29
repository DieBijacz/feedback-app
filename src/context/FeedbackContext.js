import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // UPDATE FEEDBACK ITEM
  const updateFeedback = (id, updItem) => {
    // takes all feedbacks and look for that with passed id
    // returs updated item and others witn no change
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  // ADD FEEDBACK
  const addFeedback = (newFeedback) => {
    // add id to newFeedback with uuid
    newFeedback.id = uuidv4();
    // sets array of new and prev feedbacks
    setFeedback([newFeedback, ...feedback]);
  };

  // DELETE FEEDBACK
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // EDIT FEEDBACK
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // FETCH DATA
  const fetchData = async () => {
    const resp = await fetch(
      "http://localhost:5000/feedback?_sort=id&_order=desc"
    );
    const data = await resp.json();
    setFeedback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
