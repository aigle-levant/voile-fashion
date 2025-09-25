export default async function handler(req, res) {
  const { url } = req.query;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("content-type") || "image/png");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching image");
  }
}