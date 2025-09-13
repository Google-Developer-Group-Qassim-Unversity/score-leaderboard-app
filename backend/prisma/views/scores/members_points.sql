SELECT
  `m`.`id` AS `id`,
  `m`.`name` AS `member name`,
  `a`.`name` AS `action name`,
  `a`.`points` AS `points`
FROM
  (
    (
      (
        `scores`.`members` `m`
        JOIN `scores`.`members_logs` `ml` ON((`ml`.`member_id` = `m`.`id`))
      )
      JOIN `scores`.`logs` `l` ON((`l`.`id` = `ml`.`log_id`))
    )
    JOIN `scores`.`actions` `a` ON((`a`.`id` = `l`.`action_id`))
  )