// import module 
import express from "express";
import addAccount from "./account/signup/emailRegister.js";
import verifyEmail from "./account/signup/verifyEmail.js";
import { multerUploadAvatars } from "../controller/multer/multer.js"
import { jwtVerifyEmail } from './../jwt/jwtVerify.js';
import logout from './account/logout.js';
import emailLogin from "./account/signin/emailLogin.js";
import resendToken from "./account/signup/resendToken.js";
import { generateTokenResetPassword, resetPassword } from './account/signin/resetPassword.js';
import getData from "../jwt/getData.js";
import emailUpdateProfil from "./account/emailUpdateProfil.js";
import callbackUploadAvatar from "./multer/uploadAvatar.js";
import addNote from "./data/note/addNote.js";
import { deleteNote } from "./data/note/deleteNote.js";
import pinnedNote from "./data/note/pinnedNote.js";
import updateNote from "./data/note/updateNote.js";
const api = express.Router();
const note = express.Router();



// /images route


// /api route
// upload photo
api.post('/upload/avatar', multerUploadAvatars.single('photo'), callbackUploadAvatar);

// show data user
api.get("/user", getData);

// update data
api.put("/update/profil", emailUpdateProfil);

// route note
note.post("/add-note", addNote);
note.post("/update-note", updateNote);
note.post("/delete-note", deleteNote);
note.post('/pinned-note', pinnedNote)

// route login and register
api.get("/logout", logout);
api.post("/register/email", addAccount);
api.get("/register/resend-token", resendToken);
api.post("/login/email", emailLogin);
api.post("/login/token-reset-password", generateTokenResetPassword);
api.post("/login/reset-password", resetPassword);
api.post('/verify-email', verifyEmail);
api.get('/jwt-verify-email', jwtVerifyEmail)

export { api, note };