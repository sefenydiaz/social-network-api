const addDate = (date) => {
    let newDate = date.toString();

    // 1st, 2nd, 3rd, or 4th character
    const char = newDate.charAt(newDate.length - 1);

    if (char === "1" && newDate !== "11") {
        newDate = `${newDate}st`;
    } else if (char === "2" && newDate !== "12") {
        newDate = `${newDate}nd`;
    } else if (char === "3" && newDate !== "13") {
        newDate = `${newDate}rd`;
    } else {
        newDate = `${newDate}th`;
}

return newDate;
};

module.exports = (
    timestamp,
    { monthLength = "short", dateAppend = true } = {}
) => {
    let months;

    if (monthLength === "short") {
        months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
    } else {
        months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        };
    }

const dateFormatted = new Date(timestamp);
const monthFormatted = months[dateFormatted.getMonth()];

  let monthDay;

  if (dateAppend) {
    monthDay = addDate(dateFormatted.getDate());
  } else {
    monthDay = dateFormatted.getDate();
  }

  const year = dateFormatted.getFullYear();

  let hour;
  // change to 24 hour clock
  if (dateFormatted.getHours > 12) {
    hour = Math.floor(dateFormatted.getHours() / 2);
  } else {
    hour = dateFormatted.getHours();
  }
  // change 0:00 to 12:00
  if (hour === 0) {
    hour = 12;
  }

  const minutes = dateFormatted.getMinutes();

  // am or pm/ midday or meridiem
  let meridiem;

  if (dateFormatted.getHours() >= 12) {
    meridiem = "pm";
  } else {
    meridiem = "am";
  }

  const correctTimestamp = `${monthFormatted} ${monthDay}, ${year} at ${hour}:${minutes} ${meridiem}`;

  return correctTimestamp;
}