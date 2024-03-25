/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { initialSize } from "@/constants/initialSize";

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
  Font,
} from "@react-email/components";

interface OrderEmailProps {
  selectedPostcards: string[];
  name: string;
  comment: string;
  lang: string;
  orderId: string;
  userAddress: string;
}

export const OrderEmail = ({
  selectedPostcards,
  name,
  comment,
  lang,
  orderId,
  userAddress,
}: OrderEmailProps) => {
  // lang relies on user's browser

  return (
    <Html lang={lang}>
      <Tailwind>
        <Head key={orderId} />
        <Font
          fontFamily="Roboto Slab"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&display=swap",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <>
          <Preview>Плетунья благодорит вас за заказ!</Preview>
          <Body className="bg-slate-100">
            <Container className="bg-white text-black p-5 shadow-lg pt-10 my-20 mx-auto">
              <Img
                src="https://lh3.googleusercontent.com/a/ACg8ocLHNw_iQ2naWLZu20fzYbLahqqai-XuoeoFZ-3CUhdsng=s576-c-no"
                alt="pletunia"
                className="rounded-full mx-auto w-24"
              ></Img>
              <Heading as="h2" className="text-center text-xl">
                Здравствуйте, {name}!
              </Heading>
              <Section className="p-5">
                <Row className="mb-8">
                  <Text>
                    Номер вашего заказа:{" "}
                    <Text className="font-extrabold inline">{orderId}</Text>
                  </Text>
                  <Text>
                    Вы выбрали:{" "}
                    <Text className="font-extrabold inline">
                      {selectedPostcards}
                    </Text>
                  </Text>
                  <Text>
                    Адрес:{" "}
                    <Text className="font-extrabold inline">{userAddress}</Text>
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
                      По любым вопросам пишите на почту:
                      pletunia.orders@gmail.com или в Телеграм:{" "}
                      <Link
                        href="https://t.me/Alyonka_che"
                        className="visited:text-rose-500"
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
      </Tailwind>
    </Html>
  );
};

export default OrderEmail;

{
  /* {lang.includes("ru") ? ( */
}

// className="text-white
// flex flex-col  pt-20 pb-20 px-10 pr-28
// lg:text-xl lg:grid grid-cols-order lg:grid-rows-order lg:pl-0 lg:items-start"
// style={{
//   background:
//     'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(24, 64, 23, 0.8)), url("/images/pages/green_girl.jpg")',
//   backgroundSize: `${initialSize <= 1168 ? "17%" : "14%"}`,
//   backgroundPositionY: `67%`,
//   backgroundPositionX: `49%`,
// }}

{
  /* en is missing here*/
}
// ) : (
//   <>
//     <Preview>Hi, thanks for the order!</Preview>
//     <Body>
//       <Container className="mx-10 my-auto">
//         <Heading>Hello, {name}</Heading>
//         <Section className="px-6 py-10">
//           <Column>
//             <Text>You've selected: {selectedPostcards}</Text>
//             <Text>Your comment: {comment}</Text>
//             <Text>
//               We'll reach you soon! If you have any extra questions,
//               please leave a message here: pletunia.orders@gmail.com or
//               in Telegram: @Alyonka_che
//             </Text>
//           </Column>
//         </Section>
//       </Container>
//     </Body>
//   </>
// )}
