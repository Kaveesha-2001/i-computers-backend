import axios from "axios"

const SYSTEM_INSTRUCTION = "You are the helpful support assistant for I Computers, a computer/electronics shop's website. Answer questions about products, orders, shipping, and general computer buying advice. Keep answers short and friendly. If asked something unrelated to the shop or computers, politely steer the conversation back."

export async function sendMessage(req,res){

    const userMessage = req.body.message
    const history = req.body.history || []   // [{role: "user"|"model", text: "..."}]

    if(!userMessage || userMessage.trim() === ""){
        res.status(400).json({
            message : "Message is required"
        })
        return
    }

    try{

        // Build the conversation in the shape Gemini expects
        const contents = [
            ...history.map((item) => ({
                role : item.role,
                parts : [{ text : item.text }]
            })),
            {
                role : "user",
                parts : [{ text : userMessage }]
            }
        ]

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                systemInstruction : {
                    parts : [{ text : SYSTEM_INSTRUCTION }]
                },
                contents : contents
            },
            {
                headers : {
                    "Content-Type" : "application/json",
                    "x-goog-api-key" : process.env.GEMINI_API_KEY
                }
            }
        )

        const reply = response.data.candidates[0].content.parts[0].text

        res.json({
            reply : reply
        })

    }catch(error){
        console.log(error.response ? error.response.data : error)
        res.status(500).json({
            message : "Chatbot is unavailable right now, please try again later"
        })
    }
}