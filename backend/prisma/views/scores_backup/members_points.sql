SELECT
  `scores_backup`.`members`.`id` AS `member_id`,
  `scores_backup`.`members`.`name` AS `member_name`,
  `scores_backup`.`members`.`gender` AS `member_gender`,
  `scores_backup`.`members_logs`.`id` AS `member_log_id`,
  `scores_backup`.`logs`.`id` AS `log_id`,
  `scores_backup`.`events`.`name` AS `event_name`,
  `scores_backup`.`logs`.`start_date` AS `start_date`,
  `scores_backup`.`logs`.`end_date` AS `end_date`,
  `scores_backup`.`actions`.`points` AS `action_points`,
  `scores_backup`.`actions`.`action_name` AS `action_name`
FROM
  (
    (
      (
        (
          `scores_backup`.`members`
          JOIN `scores_backup`.`members_logs` ON(
            (
              `scores_backup`.`members_logs`.`member_id` = `scores_backup`.`members`.`id`
            )
          )
        )
        JOIN `scores_backup`.`logs` ON(
          (
            `scores_backup`.`logs`.`id` = `scores_backup`.`members_logs`.`log_id`
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