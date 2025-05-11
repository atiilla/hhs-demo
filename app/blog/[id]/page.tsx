"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: "Building an Open Source Drone from Scratch",
    excerpt: "A step-by-step guide to building your own autonomous drone using open source hardware and software.",
    content: `
      <p>Building your own drone is an exciting project that combines hardware, software, and a bit of creativity. In this guide, we'll walk through the process of creating an autonomous drone using open source components.</p>
      
      <h2>Materials You'll Need</h2>
      <ul>
        <li>Flight controller (e.g., Pixhawk, ArduPilot)</li>
        <li>Drone frame</li>
        <li>Motors and ESCs</li>
        <li>Propellers</li>
        <li>Battery and power distribution board</li>
        <li>Radio transmitter and receiver</li>
        <li>Optional: GPS module, telemetry radio, camera</li>
      </ul>
      
      <h2>Step 1: Assembling the Frame</h2>
      <p>Start by assembling your drone frame according to the manufacturer's instructions. Most frames come with detailed assembly guides. Make sure all connections are secure and the frame is balanced.</p>
      
      <h2>Step 2: Installing Motors and ESCs</h2>
      <p>Mount the motors to the arms of your frame and connect them to the electronic speed controllers (ESCs). The ESCs should then be connected to your power distribution board.</p>
      
      <h2>Step 3: Setting Up the Flight Controller</h2>
      <p>Install your flight controller in the center of the frame, making sure it's oriented correctly. Connect the ESCs to the appropriate outputs on the flight controller.</p>
      
      <h2>Step 4: Installing Radio Receiver and Optional Components</h2>
      <p>Connect your radio receiver to the flight controller. If you're using additional components like GPS or telemetry, install these as well.</p>
      
      <h2>Step 5: Software Configuration</h2>
      <p>Download the appropriate firmware for your flight controller (e.g., ArduCopter for ArduPilot-based controllers). Use Mission Planner, QGroundControl, or a similar ground control station to configure your drone's parameters.</p>
      
      <h2>Step 6: Calibration and Testing</h2>
      <p>Calibrate your accelerometer, compass, and radio. Perform a motor test to ensure all motors are spinning in the correct direction. Start with a simple hover test in a safe, open area.</p>
      
      <h2>Next Steps</h2>
      <p>Once your drone is flying reliably, you can start exploring autonomous features like waypoint missions, return-to-home functionality, and even computer vision for obstacle avoidance.</p>
      
      <p>Building your own drone is a rewarding experience that teaches you about electronics, programming, and aerodynamics. Happy flying!</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "hardware",
    author: "Ahmet Yılmaz",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-05-15",
    readTime: "12 min read",
    tags: ["drones", "hardware", "DIY", "robotics"],
  },
  {
    id: 2,
    title: "Machine Learning for Beginners: A Practical Introduction",
    excerpt: "Learn the basics of machine learning with practical examples and code snippets you can use right away.",
    content: `
      <p>Machine learning might seem intimidating at first, but with the right approach, anyone can start building models and making predictions. This guide will introduce you to the fundamentals with practical examples.</p>
      
      <h2>What is Machine Learning?</h2>
      <p>Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Instead of writing rules, you provide data and the algorithm finds patterns.</p>
      
      <h2>Types of Machine Learning</h2>
      <ul>
        <li><strong>Supervised Learning:</strong> Training with labeled data (e.g., classification, regression)</li>
        <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data (e.g., clustering)</li>
        <li><strong>Reinforcement Learning:</strong> Learning through trial and error with rewards</li>
      </ul>
      
      <h2>Getting Started with Python</h2>
      <p>Python is the most popular language for machine learning. You'll need libraries like NumPy, Pandas, Scikit-learn, and potentially TensorFlow or PyTorch.</p>
      
      <pre><code>
# Install necessary libraries
pip install numpy pandas scikit-learn matplotlib

# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
      </code></pre>
      
      <h2>A Simple Linear Regression Example</h2>
      <p>Let's predict house prices based on size:</p>
      
      <pre><code>
# Sample data: house size (sqft) and price ($)
sizes = np.array([1400, 1600, 1700, 1875, 1100, 1550, 2350, 2450, 1425, 1700])
prices = np.array([245000, 312000, 279000, 308000, 199000, 219000, 405000, 324000, 319000, 255000])

# Reshape for scikit-learn
sizes = sizes.reshape(-1, 1)

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(sizes, prices, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
print(f"Coefficient: {model.coef_[0]}")
print(f"Intercept: {model.intercept_}")

# Visualize results
plt.scatter(sizes, prices, color='blue', label='Actual prices')
plt.plot(sizes, model.predict(sizes), color='red', label='Predicted prices')
plt.xlabel('House Size (sqft)')
plt.ylabel('Price ($)')
plt.legend()
plt.show()
      </code></pre>
      
      <h2>Next Steps</h2>
      <p>After mastering the basics, you can explore:</p>
      <ul>
        <li>More complex algorithms like Random Forests and Neural Networks</li>
        <li>Feature engineering to improve model performance</li>
        <li>Cross-validation for better evaluation</li>
        <li>Hyperparameter tuning to optimize your models</li>
      </ul>
      
      <p>Machine learning is a vast field with endless possibilities. Start small, experiment often, and keep learning!</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "software",
    author: "Zeynep Kaya",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-06-22",
    readTime: "8 min read",
    tags: ["machine learning", "python", "data science", "AI"],
  },
  {
    id: 3,
    title: "Ethical Hacking: Protecting Your Digital Assets",
    excerpt: "Discover the techniques ethical hackers use to identify vulnerabilities and how to protect your systems.",
    content: `
      <p>Ethical hacking, also known as penetration testing or white-hat hacking, involves identifying and addressing security vulnerabilities before malicious actors can exploit them. This guide introduces key concepts and techniques.</p>
      
      <h2>What is Ethical Hacking?</h2>
      <p>Ethical hacking is the practice of testing computer systems, networks, and applications to identify security weaknesses. Unlike malicious hacking, ethical hacking is performed with permission and aims to improve security.</p>
      
      <h2>The Ethical Hacking Process</h2>
      <ol>
        <li><strong>Reconnaissance:</strong> Gathering information about the target</li>
        <li><strong>Scanning:</strong> Identifying open ports and services</li>
        <li><strong>Gaining Access:</strong> Exploiting vulnerabilities</li>
        <li><strong>Maintaining Access:</strong> Testing persistence</li>
        <li><strong>Covering Tracks:</strong> Removing evidence of entry</li>
        <li><strong>Reporting:</strong> Documenting findings and recommendations</li>
      </ol>
      
      <h2>Essential Tools</h2>
      <ul>
        <li><strong>Kali Linux:</strong> A specialized Linux distribution for security testing</li>
        <li><strong>Nmap:</strong> Network scanning and discovery</li>
        <li><strong>Wireshark:</strong> Network protocol analyzer</li>
        <li><strong>Metasploit:</strong> Exploitation framework</li>
        <li><strong>Burp Suite:</strong> Web application security testing</li>
        <li><strong>John the Ripper:</strong> Password cracking</li>
      </ul>
      
      <h2>Common Vulnerabilities</h2>
      <p>Understanding common vulnerabilities is essential for both ethical hackers and defenders:</p>
      <ul>
        <li><strong>Injection Flaws:</strong> SQL injection, command injection</li>
        <li><strong>Broken Authentication:</strong> Weak passwords, session management flaws</li>
        <li><strong>Sensitive Data Exposure:</strong> Unencrypted data, improper handling</li>
        <li><strong>XML External Entities (XXE):</strong> Processing untrusted XML</li>
        <li><strong>Broken Access Control:</strong> Improper authorization</li>
        <li><strong>Security Misconfiguration:</strong> Default settings, open cloud storage</li>
        <li><strong>Cross-Site Scripting (XSS):</strong> Injecting malicious scripts</li>
        <li><strong>Insecure Deserialization:</strong> Processing untrusted data</li>
        <li><strong>Using Components with Known Vulnerabilities:</strong> Outdated libraries</li>
        <li><strong>Insufficient Logging & Monitoring:</strong> Inability to detect breaches</li>
      </ul>
      
      <h2>Protecting Your Systems</h2>
      <p>Key defensive measures include:</p>
      <ul>
        <li>Keeping all software updated</li>
        <li>Implementing strong authentication (MFA)</li>
        <li>Encrypting sensitive data</li>
        <li>Regular security testing</li>
        <li>Employee security awareness training</li>
        <li>Network segmentation</li>
        <li>Proper logging and monitoring</li>
        <li>Incident response planning</li>
      </ul>
      
      <h2>Legal and Ethical Considerations</h2>
      <p>Always obtain explicit permission before testing any system. Unauthorized testing, even with good intentions, can be illegal and unethical. Many countries have specific laws regarding computer access.</p>
      
      <p>Ethical hacking is a powerful approach to improving security posture. By thinking like an attacker, you can better defend your digital assets.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "security",
    author: "Mehmet Demir",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-07-10",
    readTime: "15 min read",
    tags: ["security", "ethical hacking", "cybersecurity", "penetration testing"],
  },
  {
    id: 4,
    title: "The Future of Renewable Energy Technology",
    excerpt: "Exploring cutting-edge innovations in renewable energy and how they're shaping our sustainable future.",
    content: `
      <p>Renewable energy technologies are evolving rapidly, offering increasingly efficient and affordable alternatives to fossil fuels. This article explores the latest innovations and their potential impact on our energy future.</p>
      
      <h2>The Current State of Renewable Energy</h2>
      <p>Renewable energy sources now account for over 26% of global electricity generation, with solar and wind leading the growth. Costs have fallen dramatically, with solar PV prices dropping by 82% and wind by 39% between 2010 and 2019.</p>
      
      <h2>Next-Generation Solar Technology</h2>
      <p>Several innovations are pushing solar efficiency to new heights:</p>
      <ul>
        <li><strong>Perovskite Solar Cells:</strong> Approaching 25% efficiency, these cells use cheaper materials and simpler manufacturing processes than traditional silicon cells.</li>
        <li><strong>Bifacial Solar Panels:</strong> Capturing sunlight from both sides, increasing energy yield by 5-30%.</li>
        <li><strong>Building-Integrated Photovoltaics (BIPV):</strong> Solar cells incorporated into building materials like windows, roofs, and facades.</li>
        <li><strong>Floating Solar Farms:</strong> Panels installed on water bodies, reducing land use and improving efficiency through cooling effects.</li>
      </ul>
      
      <h2>Wind Energy Breakthroughs</h2>
      <p>Wind power continues to advance with:</p>
      <ul>
        <li><strong>Larger Turbines:</strong> New designs exceeding 15 MW capacity with blades over 100 meters long.</li>
        <li><strong>Floating Offshore Wind:</strong> Turbines that can be installed in deeper waters, vastly expanding potential sites.</li>
        <li><strong>Airborne Wind Energy:</strong> Kite-like systems that harness stronger, more consistent winds at higher altitudes.</li>
        <li><strong>Bladeless Turbines:</strong> Oscillating structures that generate electricity through vibration, reducing wildlife impacts and maintenance costs.</li>
      </ul>
      
      <h2>Energy Storage Solutions</h2>
      <p>Addressing intermittency challenges with:</p>
      <ul>
        <li><strong>Advanced Battery Chemistry:</strong> Solid-state, flow, and sodium-ion batteries offering alternatives to lithium-ion.</li>
        <li><strong>Pumped Hydro Storage:</strong> Using excess energy to pump water uphill, then releasing it through turbines when needed.</li>
        <li><strong>Compressed Air Energy Storage:</strong> Storing energy by compressing air in underground caverns.</li>
        <li><strong>Thermal Energy Storage:</strong> Using materials like molten salt to store heat for later electricity generation.</li>
        <li><strong>Green Hydrogen:</strong> Using renewable electricity to produce hydrogen for long-term storage or fuel.</li>
      </ul>
      
      <h2>Grid Integration and Smart Systems</h2>
      <p>Enabling higher renewable penetration through:</p>
      <ul>
        <li><strong>Advanced Forecasting:</strong> AI-powered prediction of renewable generation to better match supply and demand.</li>
        <li><strong>Virtual Power Plants:</strong> Aggregating distributed energy resources to provide grid services.</li>
        <li><strong>Demand Response:</strong> Adjusting consumption patterns to match renewable availability.</li>
        <li><strong>HVDC Transmission:</strong> Efficient long-distance power transmission connecting renewable resources to demand centers.</li>
      </ul>
      
      <h2>Emerging Technologies</h2>
      <p>Looking further ahead:</p>
      <ul>
        <li><strong>Ocean Energy:</strong> Wave, tidal, and ocean thermal energy conversion technologies.</li>
        <li><strong>Enhanced Geothermal Systems:</strong> Creating geothermal reservoirs in previously unsuitable locations.</li>
        <li><strong>Artificial Photosynthesis:</strong> Directly converting sunlight into fuels, mimicking plants.</li>
        <li><strong>Space-Based Solar Power:</strong> Collecting solar energy in orbit and beaming it to Earth.</li>
      </ul>
      
      <h2>The Path Forward</h2>
      <p>The transition to renewable energy requires continued innovation, supportive policies, and investment in infrastructure. With current trajectories, many experts believe a 100% renewable energy system is achievable within the next few decades.</p>
      
      <p>As these technologies mature and scale, they promise not just cleaner energy, but also greater energy security, distributed economic benefits, and resilience against climate change.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "technology",
    author: "Ayşe Yıldız",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-08-05",
    readTime: "10 min read",
    tags: ["renewable energy", "sustainability", "solar", "wind", "technology"],
  },
  {
    id: 5,
    title: "Community-Driven Innovation: The Power of Open Source",
    excerpt: "How open source communities are driving innovation and changing the technology landscape.",
    content: `
      <p>Open source software has transformed from a fringe movement to the backbone of modern technology. This article explores how community-driven development is accelerating innovation across industries.</p>
      
      <h2>The Evolution of Open Source</h2>
      <p>From Richard Stallman's GNU Project in 1983 to Linus Torvalds' Linux kernel in 1991, open source has grown from idealistic beginnings to power most of the internet, smartphones, and enterprise systems today.</p>
      
      <h2>Beyond Software: The Open Source Mindset</h2>
      <p>The collaborative principles of open source have expanded to:</p>
      <ul>
        <li><strong>Open Hardware:</strong> Arduino, Raspberry Pi, and other platforms enabling physical computing innovation</li>
        <li><strong>Open Data:</strong> Publicly accessible datasets driving research and applications</li>
        <li><strong>Open Science:</strong> Transparent research methodologies and shared results</li>
        <li><strong>Open Education:</strong> Freely available learning resources and curricula</li>
      </ul>
      
      <h2>How Communities Drive Innovation</h2>
      <p>Open source communities accelerate progress through:</p>
      <ul>
        <li><strong>Diverse Perspectives:</strong> Contributors from different backgrounds bring unique insights</li>
        <li><strong>Rapid Iteration:</strong> Continuous feedback and improvement cycles</li>
        <li><strong>Knowledge Sharing:</strong> Building on others' work rather than reinventing</li>
        <li><strong>Meritocratic Structure:</strong> Ideas valued on quality, not source</li>
        <li><strong>Distributed Problem-Solving:</strong> Parallel work on different aspects of complex challenges</li>
      </ul>
      
      <h2>Case Studies in Community Innovation</h2>
      
      <h3>Linux: The Foundation of Modern Computing</h3>
      <p>From a hobby project to powering 96.3% of the world's top million servers, Android phones, and countless embedded devices. Over 15,000 developers from more than 1,600 companies have contributed to the Linux kernel.</p>
      
      <h3>TensorFlow: Democratizing AI</h3>
      <p>Google's open-sourcing of TensorFlow in 2015 accelerated machine learning adoption. The community has since created thousands of models, extensions, and educational resources, making AI accessible to developers worldwide.</p>
      
      <h3>Arduino: Physical Computing for Everyone</h3>
      <p>This open hardware platform has enabled makers, artists, and engineers to create everything from interactive art installations to medical devices and environmental monitors.</p>
      
      <h3>Wikipedia: Collective Knowledge</h3>
      <p>While not software, Wikipedia embodies open source principles with over 55 million articles in 300 languages, created by volunteer contributors and governed by consensus.</p>
      
      <h2>Business Models Around Open Source</h2>
      <p>Companies have developed various approaches to sustainable open source:</p>
      <ul>
        <li><strong>Open Core:</strong> Free open source with premium proprietary features</li>
        <li><strong>Services and Support:</strong> Consulting, implementation, and maintenance</li>
        <li><strong>Hosted Services:</strong> Managed cloud offerings of open source software</li>
        <li><strong>Dual Licensing:</strong> Different licenses for commercial vs. non-commercial use</li>
        <li><strong>Foundation Sponsorship:</strong> Corporate funding of open source foundations</li>
      </ul>
      
      <h2>Challenges and Future Directions</h2>
      <p>The open source ecosystem faces several challenges:</p>
      
      <ul>
        <li><strong>Sustainability:</strong> Many critical projects lack sufficient funding and maintainer support</li>
        <li><strong>Security:</strong> Ensuring the security of widely-used components</li>
        <li><strong>Inclusion:</strong> Improving diversity and accessibility in communities</li>
        <li><strong>Governance:</strong> Balancing corporate influence with community interests</li>
        <li><strong>Legal Complexity:</strong> Navigating licensing and intellectual property issues</li>
      </ul>
      
      <p>Looking ahead, open source communities are likely to play even more significant roles in emerging technologies like AI, quantum computing, and biotechnology, continuing to democratize innovation and solve global challenges collaboratively.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "community",
    author: "Can Özkan",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "2023-09-18",
    readTime: "7 min read",
    tags: ["open source", "community", "innovation", "collaboration"],
  },
]

export default function BlogPostPage() {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (params.id) {
      const postId = Number.parseInt(params.id.toString())
      const foundPost = blogPosts.find((p) => p.id === postId)

      if (foundPost) {
        setPost(foundPost)
      } else {
        router.push("/blog")
      }
    }
  }, [params.id, router])

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <article className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("blog.backToBlog")}
          </Link>
        </Button>

        <div className="mb-6">
          <Badge variant="outline" className="mb-2">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blog.backToBlog")}
            </Link>
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">{t("blog.share")}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
