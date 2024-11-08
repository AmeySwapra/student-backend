import prisma from "../lib/prisma.js";

export const createStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    phoneNumber,
    courses,
    isActive,
    section,
  } = req.body;
  const image = req.files?.image ? req.files.image[0].path : null;
  const pdf = req.files?.pdf ? req.files.pdf[0].path : null;

  const parsedAge = parseInt(age, 10);

  if (isNaN(parsedAge) || parsedAge <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid age. Age must be a positive integer." });
  }

  let parsedCourses = Array.isArray(courses) ? courses : JSON.parse(courses);

  const parsedIsActive =
    isActive === "true"
      ? true
      : isActive === "false"
      ? false
      : isActive ?? true;

  if (!["Male", "Female", "Other"].includes(gender)) {
    return res
      .status(400)
      .json({
        message: "Invalid gender value. Allowed values: Male, Female, Other.",
      });
  }

  if (!["A", "B", "C", "D"].includes(section)) {
    return res
      .status(400)
      .json({ message: "Invalid section value. Allowed values: A, B, C, D." });
  }

  try {
    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        age: parsedAge,
        gender,
        email,
        phoneNumber,
        courses: parsedCourses,
        isActive: parsedIsActive,
        section,
        image,
        pdf,
      },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "A student with this email already exists." });
    }

    res.status(500).json({
      message: "An error occurred while creating the student.",
      error: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const studentData = await prisma.student.findMany();

    const updatedStudents = studentData.map((student) => ({
      ...student,
      image: student.image ? student.image.replace(/\\/g, "/") : "",
      pdf: student.pdf ? student.pdf.replace(/\\/g, "/") : "",
    }));

    res.status(200).json(updatedStudents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch all the students data" });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    phoneNumber,
    courses,
    isActive,
    section,
  } = req.body;

  const image = req.files?.image ? req.files.image[0].path : null;
  const pdf = req.files?.pdf ? req.files.pdf[0].path : null;

  const dataToUpdate = {
    firstName,
    lastName,
    age: parseInt(age),
    gender,
    email,
    phoneNumber,
    courses: courses.split(", "),
    isActive: isActive === "true",
    section,
  };

  if (image) dataToUpdate.image = image;
  if (pdf) dataToUpdate.pdf = pdf;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({
      where: { id },
    });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};
