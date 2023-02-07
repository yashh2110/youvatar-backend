const { createNewMentorSchool } = require("./school.database");

module.exports.createSchoolService = async (req, res) => {
  try {
    const {
      mentor_id,
      mentor_school_name,
      mentor_niche,
      mentor_bank_name,
      mentor_bank_account_number,
      bank_ifsc_code,
      mentor_review_file,
    } = req.body;

    // Validate all data
    if (
      !mentor_id ||
      !mentor_school_name ||
      !mentor_niche ||
      !mentor_bank_name ||
      !mentor_bank_account_number ||
      !bank_ifsc_code ||
      !mentor_review_file
    ) {
      return res.status(400).json({ error: "All field is required" });
    }

    await createNewMentorSchool({
      mentor_id,
      mentor_school_name,
      mentor_niche,
      mentor_bank_name,
      mentor_bank_account_number,
      bank_ifsc_code,
      mentor_review_file,
    });
    res.status(201).json({ message: "Mentor School created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error." });
  }
};
