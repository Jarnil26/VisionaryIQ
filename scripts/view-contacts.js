const fs = require("fs")
const path = require("path")

// Secure script to view contacts locally (run with: node scripts/view-contacts.js)
async function viewContacts() {
  try {
    const dataDir = path.join(process.cwd(), "private_data")
    const contactsFile = path.join(dataDir, "contacts.json")
    const statsFile = path.join(dataDir, "stats.json")

    console.log("🚀 VisionaryIQ Contact Database Viewer")
    console.log("=====================================\n")

    // Load and display stats
    try {
      const statsContent = fs.readFileSync(statsFile, "utf8")
      const stats = JSON.parse(statsContent)

      console.log("📊 STATISTICS:")
      console.log(`Total Contacts: ${stats.totalContacts}`)
      console.log(`Last Updated: ${new Date(stats.lastUpdated).toLocaleString()}`)

      console.log("\n📈 Contacts by Month:")
      Object.entries(stats.contactsByMonth).forEach(([month, count]) => {
        console.log(`  ${month}: ${count} contacts`)
      })

      console.log("\n🎯 Contacts by Project Type:")
      Object.entries(stats.contactsByType).forEach(([type, count]) => {
        console.log(`  ${getProjectTypeLabel(type)}: ${count} contacts`)
      })
    } catch (error) {
      console.log("📊 No statistics available yet")
    }

    // Load and display recent contacts
    try {
      const contactsContent = fs.readFileSync(contactsFile, "utf8")
      const contacts = JSON.parse(contactsContent)

      console.log(`\n📋 RECENT CONTACTS (${contacts.length} total):`)
      console.log("=".repeat(80))

      contacts.slice(0, 10).forEach((contact, index) => {
        console.log(`\n${index + 1}. ${contact.firstName} ${contact.lastName}`)
        console.log(`   📧 Email: ${contact.email}`)
        console.log(`   🏢 Company: ${contact.company}`)
        console.log(`   📋 Project: ${getProjectTypeLabel(contact.subject)}`)
        console.log(`   📅 Date: ${new Date(contact.timestamp).toLocaleString()}`)
        console.log(`   🆔 ID: ${contact.id}`)
        console.log(`   💬 Message: ${contact.message.substring(0, 100)}${contact.message.length > 100 ? "..." : ""}`)
        console.log("   " + "-".repeat(70))
      })

      if (contacts.length > 10) {
        console.log(`\n... and ${contacts.length - 10} more contacts`)
      }
    } catch (error) {
      console.log("📋 No contacts found yet")
    }
  } catch (error) {
    console.error("Error reading contact data:", error)
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

// Run the viewer
viewContacts()
