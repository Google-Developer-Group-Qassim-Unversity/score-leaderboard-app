SELECT
  `scoresTest`.`members`.`id` AS `member_id`,
  `scoresTest`.`members`.`name` AS `member_name`,
  `scoresTest`.`members_logs`.`id` AS `member_log_id`,
  `scoresTest`.`members`.`gender` AS `member_gender`,
  `scoresTest`.`logs`.`id` AS `log_id`,
  `scoresTest`.`events`.`name` AS `event_name`,
  `scoresTest`.`logs`.`start_date` AS `start_date`,
  `scoresTest`.`logs`.`end_date` AS `end_date`,
  `scoresTest`.`actions`.`points` AS `action_points`,
  `scoresTest`.`actions`.`action_name` AS `action_name`
FROM
  (
    (
      (
        (
          `scoresTest`.`members`
          JOIN `scoresTest`.`members_logs` ON(
            (
              `scoresTest`.`members_logs`.`member_id` = `scoresTest`.`members`.`id`
            )
          )
        )
        JOIN `scoresTest`.`logs` ON(
          (
            `scoresTest`.`logs`.`id` = `scoresTest`.`members_logs`.`log_id`
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