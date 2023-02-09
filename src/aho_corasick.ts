const topWords = ["tubig", "walay tubig", "walay agas", "no water", "water", "interruption", "interrupted", "service", "service interruption"];

export default function(value: string) {
    let isTop = false;

    // split the text into tokens separated by whitespace
    // e.g. (line breaks, space, tabs, and etc.)
    const tokens = value.split(/[\t\n\r\f\v]/);

    for (const token of tokens) {
        for (const pattern of topWords) {
            const idx = token.toLowerCase().indexOf(pattern);
            if (idx !== -1) {
                isTop = true;
                break;
            }
        }
    }

    return isTop;
}