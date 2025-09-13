SELECT
  `d`.`id` AS `id`,
  `d`.`name` AS `department name`,
  `a`.`name` AS `action name`,
  `a`.`points` AS `points`
FROM
  (
    (
      (
        `scores`.`departments` `d`
        JOIN `scores`.`departments_logs` `dl` ON((`dl`.`department_id` = `d`.`id`))
      )
      JOIN `scores`.`logs` `l` ON((`l`.`id` = `dl`.`log_id`))
    )
    JOIN `scores`.`actions` `a` ON((`a`.`id` = `l`.`action_id`))
  )