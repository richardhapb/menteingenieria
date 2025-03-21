
/// Format date to spanish and more readable.
const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("es-CL", options) || "";
}

export default formatDate;
