import * as React from 'react';
import { Heading, Preview, Row, Section, Text, Img, Link } from '@react-email/components';

import { EmailShell } from './EmailShell';

import { t } from './messages';
import type { OrderEmailProps, TEmailPostcard } from './props';
import { absoluteUrl, captionFor } from './utils';

import postcards from '@/data/home/postcards.json';
const CATALOG = postcards as TEmailPostcard[];

export default function OrderEmail(props: OrderEmailProps) {
  const { lang, assetBaseUrl, orderId, name, comment, selectedIds } = props;

  const selected: TEmailPostcard[] = CATALOG.filter((p) => selectedIds.includes(p.id));

  return (
    <EmailShell lang={lang}>
      <Preview>{t(lang, 'preview')}</Preview>

      <Heading as="h2" className="text-center text-xl">
        {t(lang, 'hello', { name })}
      </Heading>

      <Section className="p-5">
        <Row className="mb-6">
          <Text>
            {t(lang, 'orderNo')} <span className="inline font-extrabold">{orderId}</span>
          </Text>
        </Row>

        {/* Selected postcards as image grid */}
        {selected.length > 0 && (
          <Section className="mb-8">
            <Text className="mb-2 font-semibold">{t(lang, 'youPicked')}</Text>
            <table role="presentation" cellPadding={0} cellSpacing={0} width="100%">
              <tbody>
                <tr>
                  {selected.map((p) => (
                    <td key={p.id} style={{ paddingRight: 8, paddingBottom: 8 }}>
                      <Img
                        src={absoluteUrl(assetBaseUrl, p.emailImgUrl)}
                        alt={captionFor(p, lang)}
                        className="h-auto w-[128px] rounded"
                        width={128}
                      />
                      <Text className="mt-1 text-xs text-gray-700 italic">
                        {captionFor(p, lang)}
                      </Text>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Section>
        )}

        {/* Optional comment block */}
        {comment ? (
          <Row className="mb-8">
            <Text>
              {t(lang, 'yourComment')}
              <Text className="italic">{comment}</Text>
            </Text>
          </Row>
        ) : null}

        {/* Closing / contacts */}
        <Row>
          <Text>{t(lang, 'weWillReach')}</Text>
          <Text>
            {t(lang, 'questions')}{' '}
            <span className="text-blue-600 visited:text-rose-500">pletunia.orders@gmail.com</span>{' '}
            {t(lang, 'or')}{' '}
            <Link href="https://t.me/Alyonka_che" className="text-blue-600 visited:text-rose-500">
              @Alyonka_che
            </Link>
          </Text>
        </Row>
      </Section>
    </EmailShell>
  );
}
