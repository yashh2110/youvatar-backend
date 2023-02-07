const { createCourse } = require("./course.database");

module.exports.createCourseService = async (req, res, next) => {
  try {
    const {
      course_admin,
      course_name,
      course_category,
      university,
      description,
      no_of_batches,
      timings,
      students_per_batch,
      duration,
      no_of_module,
      pre_requisites,
      access,
      certificate,
      total_assignments,
      overview_video,
      course_actual_price,
      course_selling_price,
      course_start_date,
      course_end_date,
      course_teaching_type,
      course_active,
      course_auth,
      course_markup_percentage,
      course_revenue,
      course_priority,
      course_poupularity,
      created_at,
      updated_at,
    } = req.body;
    await createCourse({
      course_admin,
      course_name,
      course_category,
      university,
      description,
      no_of_batches,
      timings,
      students_per_batch,
      duration,
      no_of_module,
      pre_requisites,
      access,
      certificate,
      total_assignments,
      overview_video,
      course_actual_price,
      course_selling_price,
      course_start_date,
      course_end_date,
      course_teaching_type,
      course_active,
      course_auth,
      course_markup_percentage,
      course_revenue,
      course_priority,
      course_poupularity,
      created_at,
      updated_at,
    });

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
