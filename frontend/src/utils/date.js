export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
