Chrome does not support SVG images: https://issues.chromium.org/issues/41057033

We solve this by creating PNG versions. Recommended way to do this is via https://squoosh.app/

- Use Firefox. Different browsers render SVG differently, please use Firefox to ensure consistency.
- Make sure to use the highest possible compression effort.
- No interlacing, the file will always be available locally.
- Reduce the palette to 16 colors, this gives plenty of colors to support dithering while massively reducing the size.
