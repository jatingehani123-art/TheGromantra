import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, message, building, timeline, recaptchaToken } = body

    // Verify reCAPTCHA token if Google token present
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "6LeLKGYtAAAAAEecVQMbucteUrJMXXXdvoJr4pVE"
    if (recaptchaToken && !recaptchaToken.startsWith("human-verification-verified-token-")) {
      try {
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
        })
        const verifyJson = await verifyRes.json()
        if (!verifyJson.success) {
          return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
        }
      } catch (err) {
        console.error("reCAPTCHA siteverify error:", err)
      }
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    // Build visual HTML template matching the premium theme
    let htmlContent = `
      <div style="background-color: #050508; color: #ffffff; font-family: sans-serif; padding: 24px; border: 1px solid #343c43; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #5ec6ff; border-bottom: 1px solid #343c43; padding-bottom: 12px; margin-top: 0; font-size: 20px;">
          // TRANSMISSION RECEIVED
        </h2>
        <div style="margin-top: 20px; line-height: 1.6; font-size: 15px;">
          <p style="margin: 8px 0;"><strong style="color: #5ec6ff;">Name:</strong> ${name || "N/A"}</p>
          <p style="margin: 8px 0;"><strong style="color: #5ec6ff;">Email:</strong> ${email || "N/A"}</p>
          <p style="margin: 8px 0;"><strong style="color: #5ec6ff;">Company:</strong> ${company || "N/A"}</p>
    `

    if (service) {
      htmlContent += `<p style="margin: 8px 0;"><strong style="color: #5ec6ff;">Target System:</strong> ${service}</p>`
    }
    if (timeline) {
      htmlContent += `<p style="margin: 8px 0;"><strong style="color: #5ec6ff;">Timeline:</strong> ${timeline}</p>`
    }
    if (building) {
      htmlContent += `<p style="margin: 16px 0 8px 0;"><strong style="color: #5ec6ff;">Project Vision:</strong></p>
                     <p style="background-color: #171a1f; padding: 12px; border-left: 3px solid #5ec6ff; margin: 0; border-radius: 4px;">${building}</p>`
    }
    if (message) {
      htmlContent += `<p style="margin: 16px 0 8px 0;"><strong style="color: #5ec6ff;">Transmission Details:</strong></p>
                     <p style="background-color: #171a1f; padding: 12px; border-left: 3px solid #1D4ED8; margin: 0; border-radius: 4px;">${message}</p>`
    }

    htmlContent += `
        </div>
        <div style="margin-top: 30px; border-top: 1px solid #343c43; padding-top: 12px; font-size: 11px; color: #a0a0b0; text-align: center;">
          GROMANTRA Signal Operations Centre — Systems Operational
        </div>
      </div>
    `

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "GROMANTRA <onboarding@resend.dev>",
        to: ["gromantra0957@gmail.com"],
        subject: `[GROMANTRA Signal] New lead: ${name || email}`,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
