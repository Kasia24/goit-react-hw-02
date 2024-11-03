// eslint-disable-next-line no-unused-vars
import React, { memo } from "react";

const Notification = ({ message }) => {
  return <p>{message}</p>;
};

export default memo(Notification);
