import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const formData = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email,
      company: company || "Not provided",
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: "new", // new, read, replied
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Save to secure JSON database
    await saveContactToDatabase(formData)

    // Send email notification to admin (recommended)
    await sendEmailNotification(formData)

    // Log for development (remove in production)
    console.log("New contact submission:", {
      id: formData.id,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: formData.subject,
      timestamp: formData.timestamp,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        id: formData.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again or email us directly.",
      },
      { status: 500 },
    )
  }
}

// Secure database operations
async function saveContactToDatabase(contactData: any) {
  try {
    const dataDir = path.join(process.cwd(), "private_data")
    const contactsFile = path.join(dataDir, "contacts.json")
    const statsFile = path.join(dataDir, "stats.json")

    // Ensure private data directory exists
    await fs.promises.mkdir(dataDir, { recursive: true })

    // Load existing contacts
    let contacts = []
    try {
      const fileContent = await fs.promises.readFile(contactsFile, "utf8")
      contacts = JSON.parse(fileContent)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      contacts = []
    }

    // Add new contact to the beginning
    contacts.unshift(contactData)

    // Keep only the last 500 contacts to prevent file from getting too large
    if (contacts.length > 500) {
      contacts = contacts.slice(0, 500)
    }

    // Save contacts
    await fs.promises.writeFile(contactsFile, JSON.stringify(contacts, null, 2))

    // Update statistics
    await updateContactStats(statsFile, contactData)

    console.log(`Contact saved to database: ${contactData.id}`)
  } catch (error) {
    console.error("Error saving contact to database:", error)
    throw error
  }
}

async function updateContactStats(statsFile: string, contactData: any) {
  try {
    let stats = {
      totalContacts: 0,
      contactsByMonth: {},
      contactsByType: {},
      lastUpdated: new Date().toISOString(),
    }

    try {
      const statsContent = await fs.promises.readFile(statsFile, "utf8")
      stats = JSON.parse(statsContent)
    } catch (error) {
      // Stats file doesn't exist yet
    }

    // Update total
    stats.totalContacts += 1

    // Update monthly stats
    const month = new Date(contactData.timestamp).toISOString().slice(0, 7) // YYYY-MM
    stats.contactsByMonth[month] = (stats.contactsByMonth[month] || 0) + 1

    // Update type stats
    stats.contactsByType[contactData.subject] = (stats.contactsByType[contactData.subject] || 0) + 1

    stats.lastUpdated = new Date().toISOString()

    await fs.promises.writeFile(statsFile, JSON.stringify(stats, null, 2))
  } catch (error) {
    console.error("Error updating stats:", error)
  }
}

// Email notification to admin
async function sendEmailNotification(contactData: any) {
  try {
    // Create a detailed email for the admin
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
          .message-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
          .info-item { background: white; padding: 15px; border-radius: 6px; }
          .label { font-weight: bold; color: #1e293b; margin-bottom: 5px; }
          .value { color: #475569; }
          .footer { background: #1e293b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚀 New Contact Form Submission - VisionaryIQ</h2>
            <p>You have received a new inquiry from your website!</p>
          </div>
          
          <div class="content">
            <div class="info-grid">
              <div class="info-item">
                <div class="label">👤 Name</div>
                <div class="value">${contactData.firstName} ${contactData.lastName}</div>
              </div>
              <div class="info-item">
                <div class="label">📧 Email</div>
                <div class="value">${contactData.email}</div>
              </div>
              <div class="info-item">
                <div class="label">🏢 Company</div>
                <div class="value">${contactData.company}</div>
              </div>
              <div class="info-item">
                <div class="label">📋 Project Type</div>
                <div class="value">${getProjectTypeLabel(contactData.subject)}</div>
              </div>
              <div class="info-item">
                <div class="label">📅 Submitted</div>
                <div class="value">${new Date(contactData.timestamp).toLocaleString()}</div>
              </div>
              <div class="info-item">
                <div class="label">🆔 Reference ID</div>
                <div class="value">${contactData.id}</div>
              </div>
            </div>
            
            <div class="message-box">
              <div class="label">💬 Message</div>
              <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${contactData.message}</div>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="mailto:${contactData.email}?subject=Re: ${getProjectTypeLabel(contactData.subject)} Inquiry&body=Hi ${contactData.firstName},%0D%0A%0D%0AThank you for your interest in ${getProjectTypeLabel(contactData.subject)}. I'd be happy to discuss your project in more detail.%0D%0A%0D%0ABest regards,%0D%0AVisionaryIQ" class="btn">
                📧 Reply to Client
              </a>
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting with ${contactData.firstName} ${contactData.lastName}&details=Project: ${getProjectTypeLabel(contactData.subject)}%0D%0AEmail: ${contactData.email}%0D%0ACompany: ${contactData.company}" class="btn">
                📅 Schedule Meeting
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>VisionaryIQ Contact Management System</p>
            <p><small>This is an automated notification from your website contact form.</small></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Log the email content (replace with actual email sending)
    console.log("📧 EMAIL NOTIFICATION READY:")
    console.log("To: your-admin-email@gmail.com")
    console.log(
      `Subject: 🚀 New Contact: ${contactData.firstName} ${contactData.lastName} - ${getProjectTypeLabel(contactData.subject)}`,
    )
    console.log("HTML content prepared for sending")

    // Uncomment and configure with your email service:
    /*
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
      }
    })

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // Send to yourself
      subject: `🚀 New Contact: ${contactData.firstName} ${contactData.lastName} - ${getProjectTypeLabel(contactData.subject)}`,
      html: emailContent,
      replyTo: contactData.email
    })
    */
  } catch (error) {
    console.error("Error sending email notification:", error)
    // Don't throw error here - we don't want to fail the form submission if email fails
  }
}

function getProjectTypeLabel(subject: string) {
  const labels: { [key: string]: string } = {
    "ai-platform": "AI Platform Development",
    analytics: "Predictive Analytics",
    automation: "Process Automation",
    dashboard: "Interactive Dashboard",
    consulting: "AI Consulting",
    other: "Other Project",
  }
  return labels[subject] || subject
}
