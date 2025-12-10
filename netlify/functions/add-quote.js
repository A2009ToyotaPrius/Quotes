// add-quote.js
const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = process.env.REPO;        //  a2009toyotaprius/Quotes

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return {statusCode: 405};
  const {who, text} = JSON.parse(event.body);
  if (!who || !text) return {statusCode: 400, body: "Missing fields"};

  const issue = { title: who, body: text, labels: ["quote"] };
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: "POST",
    headers: {
      "Authorization": `token ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "dumb-quotes"
    },
    body: JSON.stringify(issue)
  });
  return { statusCode: res.ok ? 201 : 500, body: res.ok ? "Created" : "GitHub error" };
};