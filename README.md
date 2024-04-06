Pletunia v. 1.0 welcomes you! ✨

THE PROJECT DESCRIPTION 💌:

This is my first relatively big project dedicated to my wife’s first business. She is a very creative person, and I want to support her in any way possible, currently by helping her sell her art pieces.

For now, you can only perform one basic action on the website: ordering postcards (all made using the paper cut-out technique). After filling out the order form, you’ll receive a confirmation email, following which we’ll contact you via the provided email to discuss payment and delivery details.

============

FUTURE PLANS 🎯:

We're planning to develop the project by adding new postcards and sections for postcard construction sets and friendship bracelets.

After we're done with setting up proper e-commerce functionality (e.g. implementing a shopping cart, payment system, delivery section), we're considering expanding it further. We might add a blog, an about us section, and news updates.

============

NOTE ABOUT DEVELOPING 🚀:

The production may seem super slow as I've done a lot of rebuilding, and also I've been learning a huge amount of things on the go.

The project utilizes many libraries and tools, and it was originally built with CRA (then migrated to Next.js 14). It may contain numerous structural and coherence errors, but I’m always open to suggestions, feedback, or reviews on how to improve it.

The website currently supports two languages: Russian and English. The language of email confirmation letters is based on your browser language (RU/EN). Postcard names are also translated.

============

USED STACK 💾:

- Typescript 5
- React 18
- Next.js 14.1
- React Redux + Redux Toolkit
- Tailwind 3.3
- i18next + i18next-resources-to-backend + react-i18next + next-i18n-router
- Framer Motion
- Resend + React Email
- Nanoid
- React Scroll

============

KNOWN ISSUES & REFACTORING & MINOR THINGS 🔧:

- Check and remove unnecessary 'use client' uses
- Keep scroll (especially after translation switch)
- Check and remove unnecessary i18n namespaces + any types
- Expanded / collapsed state of the postcards may not trigger with the first click (but it does with the second one)

❓============❓
(optional or low priority):

- Add separate message for pletunia.orders
- Put all order translations into order.json
- No cache in fields in Safari (labels? htmlfor?)
- Animate drawer
- Decide where to put removeItem
- More screen responsiveness
