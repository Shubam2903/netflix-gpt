import React, { useState, useRef } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // imported from firebase
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // console.log(nameValue); /**This we can ignore */
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    // console.log(message);

    if (message) return; //if their is some error message then don't go ahead.
    //sign in sign up login
    if (!isSignInForm) {
      //signup logic taken from firebase -Create a password-based account
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //signup logic taken from firebase -Update a user's profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://www.apple.com/v/os/b/images/shared/liquid_glass/lock_screen__bd82spxl9k9u_large.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.Message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic taken from firebase - Sign in a user with an email address and password
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSingInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
          alt="BGLOGO"
        />
      </div>
      {/* 
      onSubmit={(e)=>e.preventDefaault} when we click on the submit button the whole page is getting reload so to prevent that we have to use this */}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12  absolute p-15 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {/* ---------below line ka mtlb hai conditon check hoge agar true rahe to && ke baad ka code chale----       {condition && <div>Hello</div>} */}

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full text-gray-700  bg-white"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-2 my-2 w-full text-gray-700  bg-white "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full  text-gray-700 bg-white "
        />
        <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <div>
          <button
            className="p-4 my-4  w-full bg-red-700 rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSingInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up now!"
              : "Already registered? Sign In Now."}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
