import React from "react";
import FloatingButtons from "@zeldocarina/gatsby-theme-mordecai/src/layout/FloatingButtons";

export default function ShadowedFloatingButtons(props) {
  return (
    <FloatingButtons
      {...props}
      appointmentButtonLabel="BOOK NOW"
      appointmentButtonUrl="https://book.getweave.com/53d21bae-f24d-4674-b260-5caad823c36b/appointment-requests/select-appt-type"
    />
  );
}
