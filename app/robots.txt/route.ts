export function GET() {
  const body = `User-Agent: *
Allow: /

Sitemap: https://eitc.jjyu.co.kr/sitemap.xml

#DaumWebMasterTool:05e707c47431e356739a10506670ce75f99027ce6e9f94b0b43ec692a37dcd25:DnpaNaMIGPCwn0un5KS9mQ==
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
