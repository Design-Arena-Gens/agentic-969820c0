import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful customer service agent for "Local Services," a company that provides website hosting and local service solutions. Your role is to assist customers with:

1. Website Hosting Services:
   - Shared hosting, VPS, and dedicated server options
   - WordPress hosting and management
   - Website migration assistance
   - SSL certificates and security

2. Domain Services:
   - Domain registration and transfer
   - DNS management
   - Domain privacy protection

3. Technical Support:
   - Website downtime issues
   - Email configuration problems
   - FTP/cPanel access help
   - Performance optimization

4. Billing & Account:
   - Payment inquiries
   - Plan upgrades/downgrades
   - Invoice requests
   - Refund policies (14-day money-back guarantee)

5. General Information:
   - Service features and pricing
   - Setup time expectations (usually 24-48 hours)
   - Data backup policies (daily automated backups)
   - Uptime guarantee (99.9% uptime SLA)

Always be friendly, professional, and solution-oriented. If you don't have specific information, offer to escalate to a human agent or provide contact information (support@localservices.com or call 1-800-555-0123, available 24/7).

Keep responses concise but helpful. Use bullet points for clarity when appropriate.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Simulated AI response (in production, this would use an LLM API)
async function generateResponse(messages: Message[]): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  const userInput = lastMessage.content.toLowerCase();

  // Simple keyword-based responses
  if (userInput.includes('hosting') || userInput.includes('host')) {
    return `We offer three hosting plans to meet your needs:

**Shared Hosting** - Starting at $4.99/month
• Perfect for small websites and blogs
• 10GB SSD storage, unlimited bandwidth
• Free SSL certificate included

**VPS Hosting** - Starting at $29.99/month
• Full root access and dedicated resources
• 50GB SSD storage, 2GB RAM
• Ideal for growing businesses

**Dedicated Servers** - Starting at $99.99/month
• Complete server control
• High-performance hardware
• Best for high-traffic sites

All plans include 24/7 support and our 99.9% uptime guarantee. Which option interests you?`;
  }

  if (userInput.includes('domain')) {
    return `I can help you with domain services!

**Domain Registration**
• .com domains: $12.99/year
• .net domains: $14.99/year
• .org domains: $13.99/year
• Free WHOIS privacy protection included

**Domain Transfer**
• Transfer your existing domain to us
• No downtime during transfer
• Free 1-year extension with transfer

**DNS Management**
• Easy-to-use control panel
• Custom nameservers available
• Advanced DNS record configuration

Do you need to register a new domain or transfer an existing one?`;
  }

  if (userInput.includes('down') || userInput.includes('not working') || userInput.includes('offline')) {
    return `I'm sorry to hear you're experiencing downtime. Let me help you troubleshoot:

**Quick Checks:**
1. Is your domain pointing to the correct nameservers?
2. Have you checked our status page at status.localservices.com?
3. Try clearing your browser cache and cookies

**Common Issues:**
• DNS propagation (can take 24-48 hours after changes)
• Exceeded bandwidth limits
• Server maintenance (we notify in advance)

I can escalate this to our technical team for immediate investigation. Would you like me to create a priority support ticket? Please provide your domain name or account email.`;
  }

  if (userInput.includes('billing') || userInput.includes('payment') || userInput.includes('invoice') || userInput.includes('charge')) {
    return `I can assist with billing questions.

**Common Billing Topics:**
• **Payment Methods:** We accept credit cards, PayPal, and bank transfers
• **Billing Cycle:** Monthly or annual (save 20% with annual)
• **Invoices:** Available in your customer portal
• **Auto-renewal:** Enabled by default, can be disabled in settings

**Refund Policy:**
• 14-day money-back guarantee on new services
• Prorated refunds for annual plans (minus setup fees)

What specific billing question can I help you with?`;
  }

  if (userInput.includes('upgrade') || userInput.includes('change plan')) {
    return `I'd be happy to help you upgrade your service!

**Upgrade Process:**
1. Log into your account dashboard
2. Navigate to "Services" > "Upgrade/Downgrade"
3. Select your new plan
4. Pay the prorated difference

**Benefits of Upgrading:**
• Immediate resource increase
• No downtime during upgrade
• Prorated billing - only pay for the difference

You can also downgrade at the end of your billing cycle. Would you like me to guide you through the upgrade process or provide recommendations based on your needs?`;
  }

  if (userInput.includes('email') || userInput.includes('mail')) {
    return `Let me help with email services.

**Email Hosting Included:**
• Unlimited email accounts (on most plans)
• Webmail access (RoundCube, Horde)
• IMAP/POP3/SMTP support
• Spam filtering and virus protection

**Common Setup Info:**
• **Incoming:** mail.yourdomain.com, Port 993 (IMAP) or 995 (POP3)
• **Outgoing:** mail.yourdomain.com, Port 465 or 587 (SMTP)
• **Authentication:** Required for both

**Email Issues?**
• Check your spam folder
• Verify correct server settings
• Ensure your account isn't over quota

What email issue are you experiencing?`;
  }

  if (userInput.includes('ssl') || userInput.includes('security') || userInput.includes('certificate')) {
    return `Security is our priority! Here's what we offer:

**SSL Certificates:**
• **Free SSL** (Let's Encrypt) - Included with all plans
• **Premium SSL** ($49.99/year) - For business validation
• **Wildcard SSL** ($199.99/year) - Secures all subdomains

**Security Features:**
• DDoS protection included
• Daily malware scanning
• Automatic security updates
• Web Application Firewall (WAF)

**Installation:**
Free SSL certificates are automatically installed. For premium SSL, we handle installation within 24 hours.

Would you like help installing an SSL certificate?`;
  }

  if (userInput.includes('migration') || userInput.includes('transfer site') || userInput.includes('move website')) {
    return `We offer free website migration services!

**Migration Process:**
1. Sign up for a hosting plan
2. Submit migration request through your portal
3. Our team handles the transfer (1-3 business days)
4. We verify everything works correctly
5. You update DNS when ready

**What We Migrate:**
• Website files and databases
• Email accounts and data
• DNS records
• SSL certificates

**Requirements:**
• Access to your current hosting (cPanel or FTP)
• No downtime - we test before you switch

Ready to get started? I'll need your current hosting provider details.`;
  }

  if (userInput.includes('backup') || userInput.includes('restore')) {
    return `We take backups seriously!

**Backup Schedule:**
• **Daily Backups** - Automated every night
• **Retention:** 30 days of backups stored
• **Full Account Backups** - Files, databases, emails

**Restore Options:**
• Self-service restore from control panel
• Specific file/folder restoration
• Full account restoration
• Database point-in-time recovery

**Manual Backups:**
You can create on-demand backups anytime through cPanel.

Need to restore something? Let me know what you need recovered!`;
  }

  if (userInput.includes('cancel') || userInput.includes('close account')) {
    return `I'm sorry to hear you're considering canceling.

**Before You Cancel:**
• Is there an issue we can help resolve?
• Would downgrading to a lower plan work better?
• Remember our 14-day money-back guarantee

**Cancellation Process:**
1. Log into your account
2. Go to "Services" > "My Services"
3. Select "Request Cancellation"
4. Choose immediate or end-of-term cancellation

**Important Notes:**
• Download all backups before canceling
• Export emails and databases
• Cancellation is effective at end of billing period

Is there anything I can help with to improve your experience?`;
  }

  if (userInput.includes('support') || userInput.includes('contact') || userInput.includes('help')) {
    return `We're here to help 24/7!

**Contact Options:**

📧 **Email:** support@localservices.com
📞 **Phone:** 1-800-555-0123 (24/7)
💬 **Live Chat:** Right here, or in your account portal
🎫 **Support Ticket:** Submit through your dashboard

**Response Times:**
• Critical issues: Within 1 hour
• General inquiries: Within 4 hours
• Billing questions: Within 2 hours

**Self-Service Resources:**
• Knowledge base: help.localservices.com
• Video tutorials
• Community forums

How else can I assist you today?`;
  }

  if (userInput.includes('thank') || userInput.includes('thanks')) {
    return `You're very welcome! I'm glad I could help.

If you have any other questions or need assistance in the future, don't hesitate to reach out. We're available 24/7 to support you.

Have a great day! 😊`;
  }

  if (userInput.includes('hello') || userInput.includes('hi ') || userInput === 'hi' || userInput === 'hey') {
    return `Hello! Welcome to Local Services customer support. I'm here to help you with any questions about:

• Website hosting and domains
• Technical issues
• Billing and account management
• Service upgrades or changes

What can I help you with today?`;
  }

  // Default response
  return `Thank you for your question. I'd be happy to help!

I can assist with:
• **Hosting Services** - Plans, features, and setup
• **Domain Management** - Registration, transfers, DNS
• **Technical Support** - Website issues, email, FTP
• **Billing** - Payments, invoices, upgrades
• **Account Help** - Cancellations, migrations, security

Could you please provide more details about what you need help with? Or, if you'd prefer to speak with a human agent, I can connect you to our support team at:
📧 support@localservices.com
📞 1-800-555-0123`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Add system prompt
    const fullMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Generate response
    const response = await generateResponse(fullMessages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
