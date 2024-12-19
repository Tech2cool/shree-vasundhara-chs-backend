import { Router } from "express";
import flatModel from "../../models/flat.model.js";
import { errorRes, successRes } from "../../models/response.js";

const flatRouter = Router();

flatRouter.get("/flats", async (req, res) => {
  try {
    const resp = await flatModel.find();
    return res.send(
      successRes(200, "flats", {
        dat: resp,
      })
    );
  } catch (error) {
    return res.send(errorRes(500, "Server Error"));
  }
});

flatRouter.post("/flat-add", async (req, res) => {
  const { buildingNo, wing, flatNo, unitNo, name, phoneNumber } = req.body;
  try {
    if (!buildingNo) return res.send(errorRes(401, "Building No Required"));
    if (!wing) return res.send(errorRes(401, "Wing Required"));
    if (!flatNo) return res.send(errorRes(401, "Flat No Required"));
    if (!phoneNumber) return res.send(errorRes(401, "phone number Required"));

    const oldFlat = await flatModel.findOne({
      buildingNo: buildingNo,
      wing: wing,
      flatNo: flatNo,
    });

    if (oldFlat) return res.send(errorRes(401, "Member Already Exist"));

    var id = `vasundhara-${buildingNo}-${wing}-${flatNo}`.toLowerCase();

    const newFlat = await flatModel.create({
      ...req.body,
      _id: id,
    });

    return res.send(
      successRes(200, "flat added", {
        dat: newFlat,
      })
    );
  } catch (error) {
    console.log(error);
    return res.send(errorRes(500, "Server Error"));
  }
});

flatRouter.post("/flat-update/:id", async (req, res) => {
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

export default flatRouter;
