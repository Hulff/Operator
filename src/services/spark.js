import CryptoJS from 'crypto-js';

export function getHmacUrl(lat, lon) {
  const postdata = '';
  const method = 'GET';
  const timestamp = Math.round(Date.now() / 1000);
  const secret = "d96d6f08999c48328b5e57a9026c5c54";
  const key = 'LxAppV1';
  const timestampMillis = (timestamp * 1000).toString();

  let dataToBeHashed = `${method}\n/data/lightning/v1/spark\n${postdata}\n${timestamp}\n`;
  const fakeQueryPairs = [
    ["isGpsLocation", "false"],
    ["location", `${lat},${lon}`],
    ["locationtype", "latitudelongitude"],
    ["safetyMessage", "true"],
    ["shortMessage", "true"],
    ["units", "english"],
    ["verbose", "true"],
    ["_", timestampMillis],
  ];

  fakeQueryPairs.sort();

  let result = 'https://cmn-lx.pulse.weatherbug.net/data/lightning/v1/spark?';
  fakeQueryPairs.forEach((pair, index) => {
    dataToBeHashed += pair[0] + '\n';
    result += pair[0] + '=';
    dataToBeHashed += pair[1];
    result += pair[1];
    if (index !== fakeQueryPairs.length - 1) {
      result += '&';
      dataToBeHashed += '\n';
    }
  });

  const hmacHash = CryptoJS.HmacSHA256(dataToBeHashed, secret).toString(CryptoJS.enc.Base64);

  const finalUrl = `${result}&authid=${encodeURIComponent(key)}&timestamp=${timestamp}&hash=${encodeURIComponent(hmacHash)}`;
  return finalUrl;
}