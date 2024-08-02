import React, { useEffect } from "react";
import { AppContext } from "App";
import {
  capitalizeString,
  formatName,
  formatObjectToArray,
} from "../../helpers/formatters";
import getApprovedStaffNumber from "../../helpers/getApprovedStaffnumber";

const RosterDetail = () => {
  const {
    computedRoster,
    selectedUser,
    selectedShift,
    formData,
    unusedPriorities,
  } = React.useContext(AppContext);

  const shift = computedRoster.state.shifts.shifts[selectedShift.state];
  const shift_id = selectedShift.state;

  useEffect(() => {
    // console.log(shift_id);
  }, [selectedShift.state]);

  const renderRequestStaff = (shift_id, status) => {
    if (!(shift_id in computedRoster.state.requests.groupedByShift)) {
      return <p>No approved staffs</p>;
    }

    const approvedList = formatObjectToArray(
      computedRoster.state.requests.groupedByShift[shift_id][status],
    );

    if (approvedList.length === 0) return <p>No {status} requests</p>;

    return approvedList.map((request, index) => {
      return (
        <div className={"card card--user flex--v "} key={index}>
          <div className={"card--user__profile-picture"}></div>
          <div className={"card--user__info flex--v"}>
            <span key={request.user_id}>
              {formatName(request.firstname, request.lastname, 2)} (Band{" "}
              {request.band})
            </span>
          </div>
        </div>
      );
    });
  };

  const renderDetailInfo = () => {
    if (!shift) return "";

    return (
      <div className={"roster-detail__content"}>
        <div className={"roster-detail__content__info"}>
          <h4>Shift Information:</h4>
          <div className={"card"}>
            <div className={"roster-detail__content__info flex--v"}>
              <span>{`Shift Id: ${shift_id}`}</span>
              <span>{`Date: ${shift.month}/${shift.day_num}/${shift.year}`}</span>
            </div>

            <div className={"flex--v"}>
              <span>Status: {capitalizeString(shift.status)}</span>
              <span>
                Approved Staff:{" "}
                {getApprovedStaffNumber(
                  shift_id,
                  computedRoster.state.requests.groupedByShift,
                )}
                /{shift.min_staff}
              </span>
            </div>
          </div>
        </div>
        <div className={"roster-detail__content__info"}>
          <h4>Approved Requests:</h4>
          <div className={"flex--v flex-gap--d"}>
            {renderRequestStaff(selectedShift.state, "approved")}
          </div>
        </div>
        <div className={"roster-detail__content__info"}>
          <h4>Pending Requests:</h4>
          <div className={"flex--v flex-gap--d"}>
            {renderRequestStaff(selectedShift.state, "pending")}
          </div>
        </div>
        <div className={"roster-detail__content__info"}>
          <h4>Staff Capacity:</h4>
          <div className={"card"}>
            <div className={"flex--v"}>
              <span>Minimum Staff: {shift.min_staff}</span>
              <span>Optimal Staff: {shift.optimal_staff}</span>
              <span>Maximum Staff: {shift.optimal_staff}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const render = () => {
    return (
      <div className={"component__roster-detail flex--v"}>
        {renderDetailInfo()}
      </div>
    );
  };

  return render();
};

export default RosterDetail;
