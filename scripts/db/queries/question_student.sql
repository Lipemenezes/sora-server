WITH myconstants (MY_SKILL_ID, MY_SKILL_LEVEL, MY_HOUSE_ID, MIN_SKILL_LEVEL) as (
   values (1, 1, 1, 3)
)

SELECT 
    ssl.user_id 
	
FROM 
	student_skill_level ssl 

LEFT JOIN 
	students_in_houses sih on ssl.user_id = sih.user_id
	
JOIN myconstants mc on true

WHERE
    ssl.skill_id = mc.MY_SKILL_ID
	AND ssl.skill_level >= mc.MIN_SKILL_LEVEL
    AND ssl.skill_level > mc.MY_SKILL_LEVEL

ORDER BY (
    CASE WHEN sih.house_id = mc.MY_HOUSE_ID THEN 2 ELSE 1 END,
    ssl.skill_level
) 
DESC

