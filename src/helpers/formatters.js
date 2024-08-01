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
