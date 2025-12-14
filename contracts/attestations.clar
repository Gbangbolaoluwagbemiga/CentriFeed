(define-map content {hash: (buff 32)} {url: (string-ascii 200), attestor: principal})

(define-public (attest (hash (buff 32)) (url (string-ascii 200)))
  (begin
    (map-set content {hash: hash} {url: url, attestor: tx-sender})
    (ok true)
  )
)

