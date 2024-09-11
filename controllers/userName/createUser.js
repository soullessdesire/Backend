const User = require("../../Schemas/DB/user");
const hashing = require("../../cryptography/hashing");
require("dotenv").config();
const generateToken = require("../../authFuncs/generateToken");
const kinInfo = require("../../Schemas/DB/kinInfo");
const Services = require("../../Schemas/DB/Services");
const personalDetails = require("../../Schemas/DB/personalDetails");
const Image = require("../../Schemas/DB/image");
const Address = require("../../Schemas/DB/address");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    let kin;
    let service;
    let personal;
    let Ad;
    let image;
    try {
      const { closestKinName, closestKinPhoneNumber } = req.body;
      if (closestKinName && closestKinPhoneNumber) {
        kin = await kinInfo.create({
          closestKinName,
          closestKinPhoneNumber,
        });
        console.log(kin);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const { servicesNeeded } = req.body;
      console.log(servicesNeeded);
      if (servicesNeeded) {
        const { physicalTherapy, coupleTherapy, drugRehab } = servicesNeeded;
        service = await Services.create({
          physicalTherapy,
          coupleTherapy,
          drugRehab,
        });
        console.log(service);
      }
    } catch (e) {
      console.log(e);
    }
    const { Gender, Status, Sexuality, Religion, phoneNumber, dateOfBirth } =
      req.body;
    if (Gender && Status && Sexuality && Religion && dateOfBirth) {
      personal = await personalDetails.create({
        Gender,
        Status,
        Sexuality,
        Religion,
        dateOfBirth,
        phoneNumber,
      });
      console.log(personal);
    }
    console.log(req.file);
    if (req.file) {
      image = await Image.create({
        path: req.file.path,
      });
      console.log(image);
    }
    const { address } = req.body;
    if (address) {
      Ad = await Address.create({ address });
      console.log(Ad);
    }
    const { username, email } = req.body;
    let { password } = req.body;
    password = await hashing(password);
    console.log(personal._id);
    console.log(service._id);
    console.log(image._id);
    console.log(kin._id);
    console.log(Ad._id);
    const user = await User.create({
      username,
      email,
      password,
      kinInfo: kin._id,
      Services: service._id,
      personalDetails: personal._id,
      Image: image._id,
      Address: Ad._id,
    });
    const token = generateToken(username);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });

    console.log(error);
  }
};

module.exports = createUser;
//TODO: use the save function after the debugging and testing
