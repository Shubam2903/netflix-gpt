import React from "react";

const checkValidateData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

export default checkValidateData;

// we will use rejex which u will get from their site to check whether the email is valid or not .(Ref:-https://saturncloud.io/blog/how-can-i-validate-an-email-address-using-a-regular-expression/)
