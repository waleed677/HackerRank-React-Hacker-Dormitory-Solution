import React from "react";

function Error(props) {
  return (
    <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
     {props.message}
    </div>
  );
}

export default Error;
