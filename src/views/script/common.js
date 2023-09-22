export default {
    getUrl:(name) => {
        return new URL(`../assets/${name}`, import.meta.url).href;
    }
}
