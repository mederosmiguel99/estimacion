/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    'TWILIO_ACCOUNT_SID': 'xxxx',
    'TWILIO_AUTH_TOKEN': 'xxxx',
    'TWILIO_WHATSAPP_FROM': '',
  'TWILIO_WHATSAPP_TO': '58135607',
  }
};

export default nextConfig;
