/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Font,
} from '@react-email/components';
import { OrderEmailProps } from '@/types/props';

export const OrderEmail = ({
  selectedPostcards,
  name,
  comment,
  lang,
  orderId,
}: OrderEmailProps) => {
  return (
    <Html lang={lang}>
      <Tailwind>
        <Head key={orderId} />
        <Font
          fontFamily="Roboto Slab"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&display=swap',
            format: 'truetype',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        {lang.includes('ru') ? (
          <>
            <Preview>Плетунья благодорит вас за заказ!</Preview>
            <Body className="bg-slate-100">
              <Container className="mx-auto my-20 bg-white p-5 pt-10 text-black shadow-lg">
                <Img
                  src="https://lh3.googleusercontent.com/a/ACg8ocLHNw_iQ2naWLZu20fzYbLahqqai-XuoeoFZ-3CUhdsng=s576-c-no"
                  alt="pletunia"
                  className="mx-auto w-24"
                ></Img>
                <Heading as="h2" className="text-center text-xl">
                  Здравствуйте, {name}!
                </Heading>
                <Section className="p-5">
                  <Row className="mb-8">
                    <Text>
                      Номер вашего заказа: <span className="inline font-extrabold">{orderId}</span>
                    </Text>
                    <Text>
                      Вы выбрали:{' '}
                      <span className="inline font-extrabold">
                        {selectedPostcards.map((postcard: string, i: number) =>
                          i === selectedPostcards.length - 1 ? postcard : postcard + ', '
                        )}
                      </span>
                    </Text>
                    <Text>
                      Примечания / доп. контакты:
                      <Text className="italic">{comment}</Text>
                    </Text>
                  </Row>
                  <Row>
                    <Text>
                      Скоро мы с вами свяжемся по поводу оплаты и доставки.
                      <Text>
                        По любым вопросам пишите на почту:{' '}
                        <span className="text-blue-600 visited:text-rose-500">
                          pletunia.orders@gmail.com
                        </span>{' '}
                        или в Телеграм:{' '}
                        <Link
                          href="https://t.me/Alyonka_che"
                          className="text-blue-600 visited:text-rose-500"
                        >
                          @Alyonka_che
                        </Link>
                      </Text>
                    </Text>
                  </Row>
                </Section>
              </Container>
            </Body>
          </>
        ) : (
          <>
            <Preview>Pletunia thanks you for the order!</Preview>
            <Body className="bg-slate-100">
              <Container className="mx-auto my-20 bg-white p-5 pt-10 text-black shadow-lg">
                <Img
                  src="https://lh3.googleusercontent.com/a/ACg8ocLHNw_iQ2naWLZu20fzYbLahqqai-XuoeoFZ-3CUhdsng=s576-c-no"
                  alt="pletunia"
                  className="mx-auto w-24"
                ></Img>
                <Heading as="h2" className="text-center text-xl">
                  Hello, {name}!
                </Heading>
                <Section className="p-5">
                  <Row className="mb-8">
                    <Text>
                      Your order number: <span className="inline font-extrabold">{orderId}</span>
                    </Text>
                    <Text>
                      You picked:{' '}
                      <span className="inline font-extrabold">
                        {selectedPostcards.map((postcard: string, i: number) =>
                          i === selectedPostcards.length - 1 ? postcard : postcard + ', '
                        )}
                      </span>
                    </Text>
                    <Text>
                      Your comment / extra contact:
                      <Text className="italic">{comment}</Text>
                    </Text>
                  </Row>
                  <Row>
                    <Text>
                      We'll reach you soon and discuss the details of payment and delivery.
                      <Text>
                        If you have any extra questions, please leave a message here:{' '}
                        <span className="text-blue-600 visited:text-rose-500">
                          pletunia.orders@gmail.com
                        </span>{' '}
                        or in Telegram:{' '}
                        <Link
                          href="https://t.me/Alyonka_che"
                          className="text-blue-600 visited:text-rose-500"
                        >
                          @Alyonka_che
                        </Link>
                      </Text>
                    </Text>
                  </Row>
                </Section>
              </Container>
            </Body>
          </>
        )}
      </Tailwind>
    </Html>
  );
};
