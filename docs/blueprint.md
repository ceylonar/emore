# **App Name**: Emoré Elegance

## Core Features:

- Top Navigation Bar: Display a top navigation bar with the 'Emoré' brand logo, tagline 'QUALITY WEAR IMPORTED FROM ITALY', and category menu (MEN, WOMEN, ACCESSORIES) with respective dropdowns.
- Homepage Hero Banner: Implement an auto-scrolling banner in the hero section to showcase products, using data managed in Firestore. Include overlay text (e.g., 'Beyond Linen') and a 'Shop Now' button.
- Product Catalog Display: Display products fetched from Firestore with large images and minimal design, ensuring clear presentation of item name, description, and price.
- Add to Cart Functionality: Enable users to add products to a cart, maintaining a clean and elegant black/white themed cart page. Store the products into the user session storage, instead of database.
- Checkout and WhatsApp Order: Provide a checkout form for users to input their delivery details. Upon submitting, generate a unique order ID and create a WhatsApp message with the order details, redirecting the user to WhatsApp via the provided link. WhatsApp number can be edited using the tool.
- Edit WhatsApp Number: Provide the superadmin the ability to edit the store's WhatsApp number via admin settings. When the user clicks on the 'Payment Process' button, the application will retrieve the Whatsapp number for the LLM tool for use in redirection.
- Authentication System: Implement customer authentication via Firebase Auth, supporting email/password registration and Google login. Additionally, create a hidden superadmin login page at `/superadmin-login` accessible with username/password.

## Style Guidelines:

- Background color: Off-white (#F5F5F5), providing a clean and neutral canvas for the content.
- Primary color: Dark gray (#333333), used for text, providing high contrast and readability.
- Accent color: Light gray (#BDBDBD), used for subtle highlights and dividers to maintain a minimalist aesthetic.
- Headline font: 'Playfair', serif with high-contrast and fashionable feel, for titles and main headings.
- Body font: 'PT Sans', sans-serif which provides a modern and neutral appearance, for product descriptions and body text.
- Use minimalistic line icons for navigation, category representation, and user actions, maintaining a clean and modern feel.
- Maintain a clean and spacious layout with ample white space to emphasize products and information, in line with the brand's elegant aesthetic.