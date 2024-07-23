import { useState } from "react";

 const useContextValues = () => {
  const [shiftStatus, setShiftStatus] = useState('open');

  const values = {
      shiftStatus: {
          state: shiftStatus,
          set: setShiftStatus,
        },
  }

  return values;

}

export default useContextValues;