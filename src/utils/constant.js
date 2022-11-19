const LOCAL = `${process.env.REACT_APP_LOCAL_URL}`;
const PRODUCTION = ``;

const isLocal = true;

module.exports = {
    BASE_URL: isLocal ? LOCAL : PRODUCTION
}