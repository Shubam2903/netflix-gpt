import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    //below code we have taken from the firebase - manager user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when component unmounts//
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search Button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify justify-between">
      <div>
        <img className="w-50" src={LOGO} alt="Logo" />
      </div>
      {user && (
        <div className="m-5 flex ">
          {showGptSearch && (
            <select
              className="px-5 m-2 text-white bg-pink-700 rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-5 m-2 rounded-lg bg-purple-400 hover:bg-purple-300 "
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <>
                Homepage <i className="fa-solid fa-wand-magic-sparkles"></i>
              </>
            ) : (
              <>
                GPT Search <i className="fa-solid fa-wand-magic-sparkles"></i>
              </>
            )}
          </button>

          <div className=" ml-4 flex-col items-center">
            <img
              className="w-10 h-10 ml-4 "
              src={name?.photoUrl ?? USER_AVATAR}
              alt="LoginImg"
            />
            <button onClick={handleSignOut} className="font-bold text-white">
              (Sign out)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
