import * as React from 'react';
import { Body, Container, Head, Html, Img, Tailwind, Font } from '@react-email/components';
import { EmailShellProps } from './props';

export function EmailShell({ lang, children }: EmailShellProps) {
  return (
    <Html lang={lang}>
      <Tailwind>
        <Head />
        <Font
          fontFamily="Roboto Slab"
          fallbackFontFamily={['Arial', 'Helvetica', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Body className="bg-slate-100">
          <Container className="mx-auto my-12 bg-white p-6 pt-8 text-black shadow-lg">
            <Img
              src="https://lh3.googleusercontent.com/a/ACg8ocLHNw_iQ2naWLZu20fzYbLahqqai-XuoeoFZ-3CUhdsng=s576-c-no"
              alt="pletunia logo"
              className="mx-auto mb-4 w-24"
            />
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
