import { Router } from "express";
import flatModel from "../../models/flat.model.js";
import { errorRes, successRes } from "../../models/response.js";
import userModel from "../../models/user.model.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => {
  try {
    const resp = await userModel.find();
    return res.send(
      successRes(200, "Users", {
        dat: resp,
      })
    );
  } catch (error) {
    return res.send(errorRes(500, "Server Error"));
  }
});

userRouter.post("/user-add", async (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;
  try {
    if (!firstName) return res.send(errorRes(401, "firstName Required"));
    if (!phoneNumber) return res.send(errorRes(401, "phone number Required"));

    const oldFlat = await userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (oldFlat) return res.send(errorRes(401, "Member Already Exist"));

    var id = `user-${firstName ?? ""}-${
      lastName ?? ""
    }-${Date.now()}`.toLowerCase();

    const newFlat = await userModel.create({
      ...req.body,
      _id: id,
    });

    return res.send(
      successRes(200, "User added", {
        dat: newFlat,
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

userRouter.post("/user-update/:id", async (req, res) => {
  const { buildingNo, wing, flatNo, unitNo, name, phoneNumber } = req.body;
  try {
    if (!req.body) return res.send(errorRes(401, "Body Required"));

    const oldFlat = await flatModel.findOne({
      buildingNo: buildingNo,
      wing: wing,
      flatNo: flatNo,
    });

    if (!oldFlat) return res.send(errorRes(401, "not Exist"));

    const updatedData = await flatModel.findOneAndUpdate(
      { _id: oldFlat._id },
      { ...req.body }
    );

    return res.send(
      successRes(200, "flat Updated", {
        dat: updatedData,
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

export default userRouter;
