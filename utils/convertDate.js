export default function convertDate(input) {
  const orderDate = new Date(input);

  let date = orderDate.getDate();
  date = date < 10 ? `0${date}` : date;

  let month = orderDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let year = orderDate.getFullYear();

  let hours = orderDate.getHours();
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = orderDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${date}/${month}/${year} ${hours}:${minutes}`;
}
