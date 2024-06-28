export default defineEventHandler(async (event) => {
    // const { message } = await readBody(event); // Pour les requêtes
    console.log('message', event);
//   const response = await $fetch('https://hackathon-uvxt3pa-r5ljzk43o72kk.fr-3.platformsh.site/api/ai/referentiel-perf/run', {
  const response = await $fetch('http://hermes.additi.localhost/chat', {
    method: 'POST',
    body: { critere: 'Je veux faire une pub pour une promo sur un steack haché avec un budget de 100€ pour faire de la visiblité'}
  });

  return response;
});