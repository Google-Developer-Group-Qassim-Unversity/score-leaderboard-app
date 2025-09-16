SELECT
  `d`.`id` AS `id`,
  `l`.`start_date` AS `start_date`,
  `d`.`name` AS `name`,
  `a`.`name` AS `action_name`,
  `a`.`points` AS `action_points`,
  `e`.`name` AS `event_name`
FROM
  (
    (
      (
        (
          `scores`.`departments_logs` `ml`
          JOIN `scores`.`logs` `l` ON((`ml`.`log_id` = `l`.`id`))
        )
        JOIN `scores`.`actions` `a` ON((`l`.`action_id` = `a`.`id`))
      )
      JOIN `scores`.`events` `e` ON((`l`.`event_id` = `e`.`id`))
    )
    JOIN `scores`.`departments` `d` ON((`ml`.`department_id` = `d`.`id`))
  )