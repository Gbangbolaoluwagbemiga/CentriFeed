(define-data-var next-round-id uint u0)
(define-map rounds {id: uint} {topic: uint, pool: uint})
(define-map pledges {round: uint, submission: uint, pledger: principal} {amount: uint})

(define-public (create-round (topic uint) (pool uint))
  (begin
    (var-set next-round-id (+ (var-get next-round-id) u1))
    (map-set rounds {id: (var-get next-round-id)} {topic: topic, pool: pool})
    (ok (var-get next-round-id))
  )
)

(define-public (pledge (round uint) (submission uint) (amount uint))
  (begin
    (map-set pledges {round: round, submission: submission, pledger: tx-sender} {amount: amount})
    (ok true)
  )
)

