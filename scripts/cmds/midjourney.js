   module.exports = {
  config: {
    name: "midjourney",
     aliases: [`mj`],
    version: "1.0",
    author: "ArYAN",
    countDown: 20,
    category: "media",
    longDescription: {
      en: 'Generate Images using imagine API',
    },
    guide: {
      en: '.imagine [ prompt ]  '
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    if (!text) {
      return message.reply("⛔|Invalid \n━━━━━━━━━━━━\n\n➤ Please provide some prompts");
    }
    
    const baseURL = `https://aryan-apis.onrender.com/api/midjourney?prompt=${text}`;

    message.reply("🔎 Generating your image, please wait a few moments.");

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
   
    const startTime = new Date().getTime(); // Define startTime
    
    try {
      const response = await axios.get(baseURL);
      
      const endTime = new Date().getTime(); // Move endTime inside the asynchronous block
      const timeTaken = (endTime - startTime) / 1000; 
      
      message.reply({ 
        body: `🖼️ [ 𝗠𝗜𝗗𝗝𝗢𝗨𝗥𝗡𝗘𝗬 ]\n\n➤ Here is your generated image.\n➤ Time taken: ${timeTaken} seconds`,
        attachment: await global.utils.getStreamFromURL(baseURL)
      });
  
      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error("Error fetching image:", error);
      message.reply("⚠️ An error occurred while generating the image.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
}; 
