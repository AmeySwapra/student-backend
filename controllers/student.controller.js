import prisma from '../lib/prisma.js'


export const createStudent = async (req, res) => {
    const { firstName, lastName, age, gender, email, phoneNumber, courses, isActive, section } = req.body;

    try {
        // Validate the input values before sending to the database
        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value. Allowed values: Male, Female, Other." });
        }

        if (!["A", "B", "C", "D"].includes(section)) {
            return res.status(400).json({ message: "Invalid section value. Allowed values: A, B, C, D." });
        }

        // Create the new student in the database
        const newStudent = await prisma.student.create({
            data: {
                firstName,
                lastName,
                age,
                gender,
                email,
                phoneNumber,
                courses, // Ensure that 'courses' is an array of strings
                isActive: isActive ?? true, // Default to true if isActive is not provided
                section
            }
        });

        // Send the new student as a response
        res.status(201).json(newStudent);

    } catch (error) {
        console.error("Error creating student:", error); // Log the detailed error

        // Handle specific Prisma errors
        if (error.code === "P2002") { // Unique constraint error (e.g., duplicate email)
            return res.status(400).json({ message: "A student with this email already exists." });
        }

        // Handle unknown errors
        res.status(500).json({
            message: "An error occurred while creating the student.",
            error: error.message,
        });
    }
};



export const getStudent = async (req, res) => {
    try {
        const studentData = await prisma.student.findMany();
        res.status(200).json(studentData);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to fetch all the students data"})
    }
}


export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, gender, email, phoneNumber, courses, isActive, section } = req.body;

    try {
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                firstName,
                lastName,
                age,
                gender,
                email,
                phoneNumber,
                courses,
                isActive,
                section,
            },
        });

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
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
        console.error('Error deleting student:', error);
        res.status(500).json({ message: "Failed to delete student" });
    }
};
