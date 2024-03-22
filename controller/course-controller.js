import "express-async-errors";
import Course from "../model/courseSchema.js";
import Branch from "../model/branchSchema.js";

export async function postCourse(req, res) {
    const { course, author, branch } = req.body;
    const branches = await Branch.findById(branch);
    if (!branches) return res.status(400).send('Invalid genre.');


    const courses = new Course({
        course,
        author,
        branch: branches
    });
    await courses.save();
    res.status(200).json("Success");

}

export const getCourse = async (req, res) => {

    const courses = await Course.find({});
    const { startIndex, endIndex } = req.pagination;


    const queryCourses = await Course.find().skip(startIndex).limit(endIndex).sort("branch").populate("branch");

    res.status(200).json({ queryCourses, total: courses.length });

}




// export async function getCourse(req, res) {

//     const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
//     const pageSize = parseInt(req.query.size) || 1;

//     const startIndex = (pageNumber - 1) * pageSize;
//     console.log(startIndex);
//     const endIndex = startIndex + pageSize;
//     console.log(endIndex);


//     try {
//         const courses = await Course.find({})
//         const queryCourses = courses.slice(startIndex, endIndex);

//         return res.status(200).json({ queryCourses, total: courses.length });
//     } catch (error) {
//         console.log(error);
//     }
// }



export async function getCoursebyId(req, res) {

    var courses = await Course.findById(req.params.id).populate("branch");

    res.status(200).json(courses);

}

export async function updateById(req, res) {
    const { course, author, branch } = req.body;
    const branches = await Branch.findById(branch);
    console.log(branches);

    try {
        var courses = await Course.findByIdAndUpdate(req.params.id, {
            $set: {
                course, author, branch: {
                    _id: branches._id,
                    name: branches.name
                }
            }
        });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


export async function deleteById(req, res) {


    try {
        var courses = await Course.findByIdAndDelete(req.params.id);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}



