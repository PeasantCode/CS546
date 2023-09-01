import {
  checkEmail,
  checkPassword,
  checkRole,
  checkValidName,
} from "../helper.js";
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  firstName = checkValidName(firstName, "firstName");
  lastName = checkValidName(lastName, "lastName");
  emailAddress = checkEmail(emailAddress, "emailAddress");
  password = checkPassword(password, "password");
  role = checkRole(role, "role");
  const usersCollection = await users();
  const ifExist = await usersCollection.findOne({
    email: emailAddress.toLowerCase(),
  });
  if (ifExist) throw `${emailAddress} has existed in database!`;
  const insertInfo = await usersCollection.insertOne({
    firstName,
    lastName,
    emailAddress,
    password,
    role,
  });
  if (insertInfo.acknowledge !== true) throw "insertion failed!";
  return { insertedUser: true };
};

export const checkUser = async (emailAddress, password) => {
  emailAddress = checkEmail(emailAddress, "emailAddress");
  password = checkPassword(password, "password");
  const usersCollection = await users();
  const ifEmailAddressExist = await usersCollection.findOne({
    email: emailAddress,
  });
  if (!ifEmailAddressExist)
    throw "Either the email address or password is invalid!";
  const hash = ifEmailAddressExist.password;
  const compareRes = await bcrypt.compare(password, hash);
  if (compareRes) {
    const { firstName, lastName, emailAddress, role } = ifEmailAddressExist;
    return { firstName, lastName, emailAddress, role };
  }
  throw "Either the email address or password is invalid!";
};
