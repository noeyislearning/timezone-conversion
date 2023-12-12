import moment from "moment";

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = `${CORS_PROXY}https://www.timeapi.io/api`;

export async function convertTimezone(fromTimeZone, toTimeZone, dateTime) {
  const apiUrl = `${BASE_URL}/Conversion/ConvertTimeZone`;

  const formattedDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');

  const requestBody = {
    fromTimeZone,
    dateTime: formattedDateTime, 
    toTimeZone,
    dstAmbiguity: "",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();


    if (!response.ok) {
      throw new Error(`Conversion request failed: ${result.message}`);
    }

    return result.conversionResult.dateTime;
  } catch (error) {
    throw error;
  }
}
