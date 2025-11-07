SELECT
  `scores_backup`.`departments`.`id` AS `department_id`,
  `scores_backup`.`departments`.`name` AS `department_name`,
  `scores_backup`.`departments_logs`.`id` AS `department_log_id`,
  `scores_backup`.`logs`.`id` AS `log_id`,
  `scores_backup`.`logs`.`start_date` AS `start_date`,
  `scores_backup`.`logs`.`end_date` AS `end_date`,
  `scores_backup`.`events`.`name` AS `event_name`,
  `scores_backup`.`actions`.`points` AS `action_points`,
  `scores_backup`.`actions`.`action_name` AS `action_name`
FROM
  (
    (
      (
        (
          `scores_backup`.`departments`
          JOIN `scores_backup`.`departments_logs` ON(
            (
              `scores_backup`.`departments_logs`.`department_id` = `scores_backup`.`departments`.`id`
            )
          )
        )
        JOIN `scores_backup`.`logs` ON(
          (
            `scores_backup`.`logs`.`id` = `scores_backup`.`departments_logs`.`log_id`
          )
        )
      )
      JOIN `scores_backup`.`events` ON(
        (
          `scores_backup`.`events`.`id` = `scores_backup`.`logs`.`event_id`
        )
      )
    )
    JOIN `scores_backup`.`actions` ON(
      (
        `scores_backup`.`actions`.`id` = `scores_backup`.`logs`.`action_id`
      )
    )
  )