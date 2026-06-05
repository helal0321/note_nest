export const filterNotesBySearchtermAndDate = (
  DateOption,
  searchValue,
  selectedTopic,
) => {
  let filteredNotesBySearchAndDate = selectedTopic?.notes?.filter(
    (note) =>
      note?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
      note?.description?.toLowerCase().includes(searchValue.toLowerCase()),
  );
  filteredNotesBySearchAndDate?.sort((a, b) => {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);
    if (DateOption == "newest") {
      return date2 - date1;
    } else {
      return date1 - date2;
    }
  });
  return filteredNotesBySearchAndDate;
};
