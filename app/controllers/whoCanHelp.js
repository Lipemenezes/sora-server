'use strict';

const whoCanHelpModel = require('../models/whoCanHelp');
const studentModel = require('../models/student');

const error = (res, err) => res.status(400).json({ error: err });

module.exports = {

    async discover(req, res) {

        const { skillId } = req.query;

        if (!skillId) return error(res, 'Missing required parameter');

        const userId = req.user.userId;

        const skillsData = await studentModel.getSkillData(userId, skillId);
        if (skillsData.error) return error(res, skillsData.error);

        const studentInfo = await studentModel.getGeneralInfo(userId);
        if (studentInfo.error) return error(res, studentInfo.error);

        let result = await whoCanHelpModel.getStudents(skillId, skillsData.skill_level, studentInfo.house_id);
        if (result.error) return error(res, result.error);

        if (result.students.length > 0) return res.status(200).json({ data: result.students });

        result = await whoCanHelpModel.getFacultyMembers(skillId);
        if (result.error) return error(res, result.error);

        return res.status(200).json({ data: result.facultyMembers });
    },

};