import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // UPDATE FEEDBACK ITEM
  const updateFeedback = async (id, updItem) => {
    const resp = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await resp.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // ADD FEEDBACK
  const addFeedback = async (newFeedback) => {
    const resp = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await resp.json();
    setFeedback([data, ...feedback]);
  };

  // DELETE FEEDBACK
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, {
        method: "DELETE",
      });
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
    const resp = await fetch("/feedback?_sort=id&_order=desc");
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
