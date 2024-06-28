export default defineEventHandler(async (event) => {
  // const query = getQuery(event); // Pour les requêtes GET
  // ou
  const body = await readBody(event); // Pour les requêtes POST

  // console.log('message', body.msg);
  // console.log('msg', query);
//   const response = await $fetch('https://hackathon-uvxt3pa-r5ljzk43o72kk.fr-3.platformsh.site/api/ai/referentiel-perf/run', {
  const response = await $fetch('http://hermes.additi.localhost/chat', {
    method: 'POST',
    body: { criteres: body.msg}
  });

  const test = `${response.texte} <a href="${response.bilan}">${response.bilan}</a>`
  return response;

  // return Date.now().toString();
});