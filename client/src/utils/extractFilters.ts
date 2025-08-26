export default () => {
    const params = new URLSearchParams(window.location.search);
    const filters = Object.fromEntries(
        Array.from(params.entries()).filter(([_, value]) => value.trim())
    );
    return filters;
}