#!/bin/bash
API="http://localhost:4741"
URL_PATH="/movies"
curl "${API}${URL_PATH}" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "movie": {
      "title": "'"${TITLE}"'",
      "releaseDate":  "'"${RELEASEDATE}"'",
      "description": "'"${DESCRIPTION}"'",
      "collectionId": "'"${COLL}"'"
    }
  }'
echo
