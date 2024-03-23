/* eslint-disable react/no-unescaped-entities */
import * as React from "react";

import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface OrderEmailProps {
  selectedPostcards: string[];
  name: string;
  comment: string;
  lang: string;
}

export const OrderEmail = ({
  selectedPostcards,
  name,
  comment,
  lang,
}: OrderEmailProps) => {
  // lang relies on user's browser
  return (
    <Tailwind>
      <Html lang={lang}>
        <Head />
        {lang.includes("ru") ? (
          <>
            <Preview>АЛОХА! Спасибо за заказ!</Preview>
            <Body>
              <Container className="mx-10 my-auto">
                <Heading>Привет, {name}</Heading>
                <Section className="px-6 py-10">
                  <Column>
                    <Text>Вы выбрали {selectedPostcards}!</Text>
                    <Text>Примечания, доп. контакты: {comment}</Text>
                    <Text>
                      Скоро мы с вами свяжемся. По любым вопросам пишите на
                      почту: pletunia.orders@gmail.com или в Телеграм:
                      @Alyonka_che
                    </Text>
                  </Column>
                </Section>
              </Container>
            </Body>
          </>
        ) : (
          <>
            <Preview>Hi, thanks for the order!</Preview>
            <Body>
              <Container className="mx-10 my-auto">
                <Heading>Hello, {name}</Heading>
                <Section className="px-6 py-10">
                  <Column>
                    <Text>You've selected: {selectedPostcards}</Text>
                    <Text>Your comment: {comment}</Text>
                    <Text>
                      We'll reach you soon! If you have any extra questions,
                      please leave a message here: pletunia.orders@gmail.com or
                      in Telegram: @Alyonka_che
                    </Text>
                  </Column>
                </Section>
              </Container>
            </Body>
          </>
        )}
      </Html>
    </Tailwind>
  );
};

export default OrderEmail;
