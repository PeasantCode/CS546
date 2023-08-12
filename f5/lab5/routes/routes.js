import { Router } from "express";
export const router = Router();

router.route('/aboutme').get(async (req, res) => {
    res.json({
        firstName: "Your First Name",
        lastName: "Your Last Name",
        biography: "2 biography paragraphs separated by a new line character (\n).",
        "favoriteMovies": ["array", "of", "favorite", "movies"],
        hobbies: ["array", "of", "hobbies"],
        "fondestMemory": "One of your fondest memories from your life as far"
      });
})

router.route('/mystory').get(async(req,res) =>{
    res.json({
        storyTitle: "Story Title",
        storyGenre: "Story Genre i.e. Horror, Fiction, Non-Fiction, biographical",
        story: "Your creative story.\nSimply use line breaks for paragraphs.\nLike this."
      })
})

router.route('/educationhistory').get(async(req,res) => {
    res.json([
        {
          schoolName: "First School Name",
          degreeEarned: "First School Degree",
          numberOfYearsAttended: number,
          favoriteClasses: ["array", "of", "favorite", "classes"],
          favoriteSchoolMemory: "A memorable memory from your time in that school"
        }
    ])
})