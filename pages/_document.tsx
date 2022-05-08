import Document, { Html, Head, Main, NextScript } from 'next/document';

// TODO: Убрать uikit и все, что с ним связано.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter&family=Rubik:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
          />
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
          />
          <script
            async
            src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"
          />
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
          />
        </Head>
        <body className="overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
