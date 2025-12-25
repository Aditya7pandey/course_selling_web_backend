const purchaseModel = require("../models/purchase.model");
const courseModel = require("../models/course.model");

const create = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    if (!courseId || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // verify course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // prevent duplicate purchase
    const exists = await purchaseModel.findOne({ courseId, userId });
    if (exists) {
      return res.status(409).json({ message: "Course already purchased" });
    }

    await purchaseModel.create({ courseId, userId });

    return res.json({ message: "Course purchased successfully" });
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};

const userAllPurchases = async (req, res) => {
  try {
    const userId = req.userId;
    const allPurchase = await purchaseModel
      .find({ userId })
      .populate({
        path: "courseId",
        populate: {
          path: "adminId",
          select: "fullName",
        },
      })
      .lean()
      .exec();

    const result = allPurchase.map((purchase) => {
      // console.log(purchase.courseId?.adminId?.fullName || "no user found")
      return {
        courseName: purchase.courseId.courseName,
        instructorName: purchase.courseId?.adminId?.fullName,
        price: purchase.courseId.price,
      };
    });

    return res.json({
      message: "all user purchase access",
      // allPurchase,
      result,
    });
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};

const adminAllPurchases = async (req, res) => {
  try {
    const adminId = req.adminId;

    const courses = await courseModel.find({ adminId });

    const purchasePromises = courses.map(async (course) => {
      const purchases = await purchaseModel
        .find({ courseId: course._id })
        .populate({ path: "userId" })
        .exec();

      return purchases.map((purchase) => ({
        courseName: course.courseName, // Access from course, not purchase
        user: purchase.userId.fullName, // Access from populated purchase
        price: course.price, // Access from course
        purchaseDate: purchase.createdAt, // Additional useful info
      }));
    });

    const purchaseResults = (await Promise.all(purchasePromises)).flat();

    return res.json({
      message: "Admin all purchases",
      purchaseResults,
    });
  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};

const particularCoursePurchase = async (req, res) => {
  try {
    const { courseId } = req.params;
    const adminId = req.adminId;

    const course = await courseModel.find({adminId},{courseId});

    if(!course){
      return res.json({
        message:"Invalid course request"
      })
    }
    
    const purchaseDetails = await purchaseModel.find({courseId}).populate({path:'userId'}).populate({path:'courseId'});

    const result = purchaseDetails.map((purchase)=>{
      return {
        courseName:purchase.courseId.courseName,
        price:purchase.courseId.price,
        fullName:purchase.userId.fullName
      }
    })
    
    return res.json({
      message:"particular course puchases",
      result
    })

  } catch (err) {
    return res.json({
      error: err.message,
    });
  }
};

module.exports = {
  create,
  userAllPurchases,
  adminAllPurchases,
  particularCoursePurchase,
};
