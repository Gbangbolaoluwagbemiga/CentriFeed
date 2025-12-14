(define-map tips {submission: uint, tipper: principal} {amount: uint})

(define-public (tip (submission uint) (amount uint))
  (begin
    (map-set tips {submission: submission, tipper: tx-sender} {amount: amount})
    (ok true)
  )
)

