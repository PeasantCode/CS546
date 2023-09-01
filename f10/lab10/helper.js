export const checkValidName = (name, whatName) => {
  if (!name) throw `${whatName} must be existed!`;
  if (!typeof name !== "string") throw `${whatName} type must be string!`;
  name = name.trim();
  if (name.length > 25 || name.length < 2)
    throw `${whatName} length is not valid!`;
  if (!name.match(/^[a-z]+$/g))
    throw `${whatName} must consist of all letters!`;
  return name;
};

export const checkEmail = (emailAddress, emailAddressName) => {
  if (!emailAddress) throw `${emailAddressName} must be existed!`;
  if (typeof emailAddress !== "string")
    throw `${emailAddressName} type must be string!`;
  emailAddress = emailAddress.trim();
  if (emailAddress.length === 0) throw `${emailAddressName} must not be empty!`;
  if (!emailAddress.match(/^[a-zA-Z0-9]{5,20}@[a-z0-9]{1,5}\.com$/g))
    throw `${emailAddressName} is not valid!`;
  return emailAddress.toLowerCase();
};

export const checkPassword = (password, passwordName) => {
  if (!password) throw `${passwordName} must be existed!`;
  if (typeof password !== "string")
    throw `${passwordName} type must be string!`;
  password = password.trim();
  if (password.length < 8) throw `${password} length at least is 8!`;
  if (!password.match(/[A-Z]/gm))
    throw `${passwordName} must have at least one uppercase character!`;
  if (!password.match(/[0-9]/g))
    throw `${passwordName} must have at least one number!`;
  if (!password.match(/[^a-zA-Z0-9 ]/g))
    `${passwordName} must have at least one special character!`;
  return password;
};

export const checkRole = (role, roleName) => {
  if (!typeof role !== "string") throw `${role} type must be string!`;
  if (checkRole !== "admin" || checkRole !== "user")
    throw `${roleName} is not valid!`;
  role = role.trim.toLowerCase();
  return role;
};

export const isAuthenticated = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(403).json({ error: "Unauthorized:Please log in first!" });
  }
};

export const isAdminAuthenticated = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).json({ error: "Unauthorized:Please log in first!" });
  }
  if (req.session.user !== "admin") {
    return res
      .status(403)
      .json({ error: "Access forbidden. You are not an admin." });
  }
  next();
};

export const logging = async (req,res, next) => {
  const currentTime = new Date().toUTCString();
  const method = req.method;
  const originalUrl = req.originalUrl;
  const aaa = !!req.session.user
    ? "Authenticated User"
    : "Non-Authenticated User";
  console.log(`[${currentTime}] : ${method} ${originalUrl} (${aaa})`);
  next()
};
