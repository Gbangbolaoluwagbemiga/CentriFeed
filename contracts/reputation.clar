(define-map reputation {user: principal} {score: uint})

(define-public (set-score (score uint))
  (begin
    (map-set reputation {user: tx-sender} {score: score})
    (ok true)
  )
)

(define-read-only (get-score (user principal))
  (default-to u0 (get score (map-get? reputation {user: user})))
)

