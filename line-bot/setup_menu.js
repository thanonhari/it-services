const fs = require('fs');

const TOKEN = "HUHT73hmPLC8qWssfFCMZyRwLn8OHtMceRuFXZvbS2EdLPV9mpo4As+KuG/K0i6RczEblQE65C/6yIVhU9cf4YAdJaVsOKcuOUxDhGdkIKhWexrMxl9K1wpSJN1k70VKDgofLcdKOGyRyYOuA/S7/gdB04t89/1O/w1cDnyilFU=";
const IMAGE_PATH = "../richmenujpg1.jpg"; // ไฟล์ JPG ตัวใหม่ ขนาด < 1MB

async function setup() {
  try {
    console.log("--- Starting Rich Menu Setup ---");

    // 1. Create Rich Menu Object
    const richMenu = {
      size: { width: 2500, height: 843 },
      selected: true,
      name: "MYITDEV_MAIN_MENU",
      chatBarText: "เมนูหลัก",
      areas: [
        { bounds: { x: 0, y: 0, width: 833, height: 843 }, action: { type: "message", text: "บริการของเรา" } },
        { bounds: { x: 833, y: 0, width: 834, height: 843 }, action: { type: "uri", uri: "https://myitdev.com" } },
        { bounds: { x: 1667, y: 0, width: 833, height: 843 }, action: { type: "message", text: "ติดต่อเรา" } }
      ]
    };

    const createRes = await fetch("https://api.line.me/v2/bot/richmenu", {
      method: "POST",
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(richMenu)
    });
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(JSON.stringify(createData));
    
    const menuId = createData.richMenuId;
    console.log("✅ 1. Rich Menu Created ID:", menuId);

    // 2. Upload Image
    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const uploadRes = await fetch(`https://api-data.line.me/v2/bot/richmenu/${menuId}/content`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${TOKEN}`, 
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
    });
    if (!uploadRes.ok) throw new Error(await uploadRes.text());
    console.log("✅ 2. Image Uploaded Successfully");

    // 3. Set as Default
    const defaultRes = await fetch(`https://api.line.me/v2/bot/user/all/richmenu/${menuId}`, {
      method: "POST",
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    if (!defaultRes.ok) throw new Error(await defaultRes.text());
    console.log("✅ 3. Rich Menu set as Default for all users!");
    
    console.log("\n--- Setup Completed! Please check your LINE app ---");

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

setup();
