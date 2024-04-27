// Date utility function
const convertDate = (dateString) => {
    const dateObject = new Date(dateString);

    if (!isNaN(dateObject.getTime())) {
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11
        const day = dateObject.getDate();

        return { year, month, day };
    } else {
        return null;
    }
};

export default convertDate;
