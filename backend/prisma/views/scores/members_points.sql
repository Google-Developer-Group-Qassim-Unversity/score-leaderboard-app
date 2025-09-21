SELECT
  `scores`.`members`.`id` AS `member_id`,
  `scores`.`members`.`name` AS `member_name`,
  `scores`.`members_logs`.`id` AS `member_log_id`,
  `scores`.`logs`.`id` AS `log_id`,
  `scores`.`events`.`name` AS `event_name`,
  `scores`.`logs`.`start_date` AS `start_date`,
  `scores`.`logs`.`end_date` AS `end_date`,
  `scores`.`actions`.`points` AS `action_points`,
  `scores`.`actions`.`action_name` AS `action_name`
FROM
  (
    (
      (
        (
          `scores`.`members`
          JOIN `scores`.`members_logs` ON(
            (
              `scores`.`members_logs`.`member_id` = `scores`.`members`.`id`
            )
          )
        )
        JOIN `scores`.`logs` ON(
          (
            `scores`.`logs`.`id` = `scores`.`members_logs`.`log_id`
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