export const formatRequestObj = (requestObj) => {
  return Object.keys(requestObj).map((shift_id) => {
    return {
      shift_id: +shift_id,
      user_id: requestObj[shift_id].user_id,
      priority_user: requestObj[shift_id].priority,
    };
  });
};

export const formatObjectToArray = (obj) => {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
};

export const capitalizeString = (str) => {
  if (!str) return "";

  let words = str.split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

export const formatName = (firstname, lastname, type) => {
  if (type === 1) {
    return `${capitalizeString(lastname)}, ${capitalizeString(firstname[0])}`;
  }

  if (type === 2) {
    return `${capitalizeString(firstname)} ${capitalizeString(lastname)}`;
  }
};
