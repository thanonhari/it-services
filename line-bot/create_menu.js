
async function createRichMenu() {
  const token = "HUHT73hmPLC8qWssfFCMZyRwLn8OHtMceRuFXZvbS2EdLPV9mpo4As+KuG/K0i6RczEblQE65C/6yIVhU9cf4YAdJaVsOKcuOUxDhGdkIKhWexrMxl9K1wpSJN1k70VKDgofLcdKOGyRyYOuA/S7/gdB04t89/1O/w1cDnyilFU=";
  
  const richMenu = {
    size: { width: 2500, height: 843 },
    selected: true,
    name: "MYITDEV Main Menu",
    chatBarText: "เมนูหลัก",
    areas: [
      {
        bounds: { x: 0, y: 0, width: 833, height: 843 },
        action: { type: "message", text: "บริการของเรา" }
      },
      {
        bounds: { x: 833, y: 0, width: 834, height: 843 },
        action: { type: "uri", uri: "https://myitdev.com" }
      },
      {
        bounds: { x: 1667, y: 0, width: 833, height: 843 },
        action: { type: "message", text: "ติดต่อเรา" }
      }
    ]
  };

  const res = await fetch("https://api.line.me/v2/bot/richmenu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(richMenu)
  });
  
  const data = await res.json();
  console.log("Rich Menu Created ID:", data.richMenuId);
  return data.richMenuId;
}

createRichMenu();
