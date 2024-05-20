# Astro-Htmx-Alpine.js Online Store

This is an online store based on the [Astro](https://astro.build/) framework, a faster, lighter, HTML-first framework that outputs zero JavaScript by default. We make use of Astro's 'Islands' architecture, integrating the React framework for the React Stripe Checkout component. We also integrated [Htmx](https://htmx.org/) into Astro to send AJAX requests directly from HTML. [Alpine.js](https://alpinejs.dev/) is used for client-side reactivity (think of it like jQuery for the modern web)

As a cloud-based database, [MongoDB](https://www.mongodb.com/atlas/database) is used with [Prisma ORM](https://www.prisma.io/ ). 

[Stripe](https://stripe.com/) payment service (test mode) is integrated into the app, allowing you to make purchases with test card numbers and view all transactions on Stripe's *Payments* panel.

 In this Online Store app
 + Implemented user authentication by means of [Astro middleware](https://docs.astro.build/en/guides/middleware/)
 + Implemented Astro's [Islands](https://docs.astro.build/en/concepts/islands/) architecture, integrating the React framework for the [React Stripe Checkout](https://www.npmjs.com/package/react-stripe-checkout) component.
 + Took advantage of Astro's latest feature, [Page Partials](https://astro.build/blog/astro-340/), to render HTML content by fetching HTML fragments
 + Integrated Htmx into Astro to send AJAX requests directly from HTML
 + Showed how to use [Htmx Extensions](https://htmx.org/extensions/), such as [multi-swap](https://htmx.org/extensions/multi-swap/) and [response-targets](https://htmx.org/extensions/response-targets/), to enhance the app.
 + Created **Prisma** schema for **MongoDB**
 + Implemented data validation with [Zod](https://zod.dev/) to ensure the reliability of user input
 + Integrated **Stripe** payment service into the app
 + Enriched user interfaces with [Bootstrap](https://getbootstrap.com/) support for styling components.
 + Used Alpine.js, a minimal tool, for composing behavior directly in  markup




To get started.
```
       # Clone the repository

         git clone https://github.com/Ashot72/Astro-Htmx-Alpine.js-Online-Store
         cd Astro-Htmx-Alpine.js-Online-Store

       # Create the .env file based on the env.example.txt file and include the respective keys.
       
       # installs dependencies
         npm install

       # to run in development mode
         npm run dev
      
       # to test build preview
         npm run build
         npm run preview
      
       # Stripe Card Information for testing
         Card Number: 4242 4242 4242 4242
         CVC: 567
         Expiration Date: 12/34
```

Go to [Astro-Htmx-Alpine.js Online Store Video](https://youtu.be/TFCaattUjUs) page

Go to [Astro-Htmx-Alpine.js Online Store Description](https://ashot72.github.io/Astro-Htmx-Alpine.js-Online-Store/doc.html) page
