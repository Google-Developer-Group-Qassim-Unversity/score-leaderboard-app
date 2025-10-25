SELECT
  `scoresTest`.`departments`.`id` AS `department_id`,
  `scoresTest`.`departments`.`name` AS `department_name`,
  `scoresTest`.`departments_logs`.`id` AS `department_log_id`,
  `scoresTest`.`logs`.`id` AS `log_id`,
  `scoresTest`.`logs`.`start_date` AS `start_date`,
  `scoresTest`.`logs`.`end_date` AS `end_date`,
  `scoresTest`.`events`.`name` AS `event_name`,
  `scoresTest`.`actions`.`points` AS `action_points`,
  `scoresTest`.`actions`.`action_name` AS `action_name`
FROM
  (
    (
      (
        (
          `scoresTest`.`departments`
          JOIN `scoresTest`.`departments_logs` ON(
            (
              `scoresTest`.`departments_logs`.`department_id` = `scoresTest`.`departments`.`id`
            )
          )
        )
        JOIN `scoresTest`.`logs` ON(
          (
            `scoresTest`.`logs`.`id` = `scoresTest`.`departments_logs`.`log_id`
          )
        )
      )
      JOIN `scoresTest`.`events` ON(
        (
          `scoresTest`.`events`.`id` = `scoresTest`.`logs`.`event_id`
        )
      )
    )
    JOIN `scoresTest`.`actions` ON(
      (
        `scoresTest`.`actions`.`id` = `scoresTest`.`logs`.`action_id`
      )
    )
  )