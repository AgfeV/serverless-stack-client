import React from "react";
import { Button, Spinner } from "react-bootstrap";
//import "./LoaderButton.css";


export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner style={{marginRight:5}} animation="grow" variant="light">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
       }
      {props.children}
    </Button>
  );
}