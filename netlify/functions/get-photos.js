const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfccu82po',
  api_key: '632416722479945',
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async function(event, context) {
  try {
    const result = await cloudinary.search
      .expression('folder:""')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.resources)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};