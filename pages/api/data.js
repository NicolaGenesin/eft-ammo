const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../config/private-key.json');

const doc = new GoogleSpreadsheet('1jjWcIue0_PCsbLQAiL5VrIulPK8SzM5jjiCMx9zUuvE');

const getResults = async () => {
    await doc.useServiceAccountAuth(creds);
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
    res.status(200).json(await getResults())
}

export default handler
