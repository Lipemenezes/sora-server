WITH myconstants (MY_SKILL_ID) as (
   values (3)
)

SELECT 
    fms.user_id 
	
FROM 
	faculty_member_skills fms 

JOIN myconstants mc on true

WHERE
    fms.skill_id = mc.MY_SKILL_ID


