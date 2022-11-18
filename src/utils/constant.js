const LOCAL = `127.0.0.1:${process.env.REACT_APP_API_PORT}/recipe`;
const PRODUCTION = ``;

const isLocal = true;

module.exports = {
    BASE_URL: isLocal ? LOCAL : PRODUCTION
}