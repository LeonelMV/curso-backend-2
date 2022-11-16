const cron = require('node-cron');

const init = () => {
    cron.schedule(process.env.TEST_CRON_EXPRESSION, () => {
        console.log("Esta tarea se ejecuta cada 1 minuto.", process.env.TEST_CRON_EXPRESSION)
    });
}

module.exports = {
    init,
}