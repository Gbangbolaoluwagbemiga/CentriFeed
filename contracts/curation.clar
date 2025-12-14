(define-data-var next-topic-id uint u0)
(define-data-var next-submission-id uint u0)

(define-map topics {id: uint} {treasury: principal, fee_bps: uint})
(define-map stakes {curator: principal, topic: uint} {amount: uint, until: uint})
(define-map submissions {id: uint} {topic: uint, curator: principal, hash: (buff 32)})
(define-map votes {submission: uint, voter: principal} {dir: int, weight: uint})

(define-public (create-topic (treasury principal) (fee_bps uint))
  (begin
    (var-set next-topic-id (+ (var-get next-topic-id) u1))
    (map-set topics {id: (var-get next-topic-id)} {treasury: treasury, fee_bps: fee_bps})
    (ok (var-get next-topic-id))
  )
)

(define-public (stake (topic uint) (amount uint) (until uint))
  (begin
    (map-set stakes {curator: tx-sender, topic: topic} {amount: amount, until: until})
    (ok true)
  )
)

(define-public (submit (topic uint) (hash (buff 32)))
  (begin
    (var-set next-submission-id (+ (var-get next-submission-id) u1))
    (map-set submissions {id: (var-get next-submission-id)} {topic: topic, curator: tx-sender, hash: hash})
    (ok (var-get next-submission-id))
  )
)

(define-public (vote (submission uint) (dir int) (weight uint))
  (begin
    (map-set votes {submission: submission, voter: tx-sender} {dir: dir, weight: weight})
    (ok true)
  )
)

