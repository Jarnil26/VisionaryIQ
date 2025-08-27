const fs = require("fs")
const path = require("path")

// Script to export contacts to CSV (run with: node scripts/export-contacts.js)
async function exportContacts() {
  try {
    const dataDir = path.join(process.cwd(), "private_data")
    const contactsFile = path.join(dataDir, "contacts.json")

    const contactsContent = fs.readFileSync(contactsFile, "utf8")
    const contacts = JSON.parse(contactsContent)

    // Create CSV content
    const csvHeader = "ID,First Name,Last Name,Email,Company,Project Type,Message,Date,Status\n"
    const csvRows = contacts
      .map((contact) => {
        const message = contact.message.replace(/"/g, '""').replace(/\n/g, " ")
        return `"${contact.id}","${contact.firstName}","${contact.lastName}","${contact.email}","${contact.company}","${getProjectTypeLabel(contact.subject)}","${message}","${contact.timestamp}","${contact.status}"`
      })
      .join("\n")

    const csvContent = csvHeader + csvRows

    // Save CSV file
    const exportDir = path.join(process.cwd(), "exports")
    fs.mkdirSync(exportDir, { recursive: true })

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    const csvFile = path.join(exportDir, `contacts-export-${timestamp}.csv`)

    fs.writeFileSync(csvFile, csvContent)

    console.log(`✅ Contacts exported successfully!`)
    console.log(`📁 File: ${csvFile}`)
    console.log(`📊 Total contacts: ${contacts.length}`)
  } catch (error) {
    console.error("Error exporting contacts:", error)
  }
}

function getProjectTypeLabel(subject) {
  const labels = {
    "ai-platform": "AI Platform Development",
    analytics: "Predictive Analytics",
    automation: "Process Automation",
    dashboard: "Interactive Dashboard",
    consulting: "AI Consulting",
    other: "Other Project",
  }
  return labels[subject] || subject
}

exportContacts()
