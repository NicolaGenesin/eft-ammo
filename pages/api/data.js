const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.NEXT_TARGET_SHEET);

const getResults = async () => {
    await doc.useServiceAccountAuth({
        client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    await sheet.loadHeaderRow(38)
    const rows = await sheet.getRows({
        limit: 160,
        // offset: 38
    })

    const results = {}
    let currentKey = ''

    rows.forEach(row => {
        const rawData = row._rawData

        if (rawData[0] !== '') {
            currentKey = rawData[0]

            console.log(currentKey)

            results[currentKey] = [row._rawData]
        } else {
            results[currentKey].push(row._rawData)
        }
    })

    return results
}

const handler = async (req, res) => {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate-1200')
    res.status(200).json(await getResults())
}

export default handler
