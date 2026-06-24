exports.handler = async function(event, context) {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  try {
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const getData = await getRes.json();
      const photos = getData.record.photos || [];
      photos.unshift(body);
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
        body: JSON.stringify({ photos })
      });
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true }) };

    } else if (event.httpMethod === 'DELETE') {
      const body = JSON.parse(event.body);
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
        body: JSON.stringify({ photos: body.photos })
      });
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true }) };

    } else {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const data = await res.json();
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data.record.photos || []) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};