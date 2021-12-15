### Development

    npm run dev

### Secrets

Secrets will need to be placed in the .env.local folder in order to be picked up. They are only used by the api to fetch the ammo types.

    NEXT_TARGET_SHEET (id of the spreadsheet we want to parse)
    NEXT_GOOGLE_CLIENT_EMAIL (see google-spreadsheet docs)
    NEXT_GOOGLE_PRIVATE_KEY (see google-spreadsheet docs)
