import prisma from "../lib/prisma.js";

export const updateUser = async (req, res) => {
    const { id } = req.body;
    const {firstName, lastName, email, password} = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where : {id},
            data : {
                firstName,
                lastName,
                email,
                password
            }
        })
        res.status(201).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message :" Failed to Update"}, error.message)
    }
}






