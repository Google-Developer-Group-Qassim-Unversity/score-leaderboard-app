SELECT
  `scores`.`departments`.`id` AS `department_id`,
  `scores`.`departments`.`name` AS `department_name`,
  `scores`.`departments_logs`.`id` AS `department_log_id`,
  `scores`.`logs`.`id` AS `log_id`,
  `scores`.`events`.`name` AS `event_name`,
  `scores`.`actions`.`points` AS `points_per_action`
FROM
  (
    (
      (
        (
          `scores`.`departments`
          JOIN `scores`.`departments_logs` ON(
            (
              `scores`.`departments_logs`.`department_id` = `scores`.`departments`.`id`
            )
          )
        )
        JOIN `scores`.`logs` ON(
          (
            `scores`.`logs`.`id` = `scores`.`departments_logs`.`log_id`
          )
        )
      )
      JOIN `scores`.`events` ON(
        (
          `scores`.`events`.`id` = `scores`.`logs`.`event_id`
        )
      )
    )
    JOIN `scores`.`actions` ON(
      (
        `scores`.`actions`.`id` = `scores`.`logs`.`action_id`
      )
    )
  )