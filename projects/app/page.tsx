import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Database, Layout, MessageSquare, Smartphone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureModal from "@/components/feature-modal"
import DatabaseDesign from "@/components/database-design"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="font-bold text-xl">ProjectHub</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
            <Link href="#features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="#database" className="transition-colors hover:text-foreground/80">
              Database
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80">
              About Us
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Log In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Custom-Built Websites & Projects On Demand
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your go-to platform for custom-built websites and projects—designed especially for students,
                  freelancers, and businesses.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="animate-pulse">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Core Functionalities</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Everything you need for a successful web project
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Feature 1 */}
              <FeatureModal
                icon={<Layout className="h-6 w-6 text-primary" />}
                title="Admin & User Dashboards"
                description="Separate dashboards with different roles and access levels for complete control."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">Admin Dashboard Features:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>User management and role assignment</li>
                      <li>Project tracking and status updates</li>
                      <li>Analytics and reporting tools</li>
                      <li>Content management system</li>
                      <li>Global settings and configurations</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">User Dashboard Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Project overview and progress tracking</li>
                      <li>Communication tools and message center</li>
                      <li>File uploads and document sharing</li>
                      <li>Payment history and invoices</li>
                      <li>Profile management and settings</li>
                    </ul>
                  </>
                }
              />

              {/* Feature 2 */}
              <FeatureModal
                icon={<Smartphone className="h-6 w-6 text-primary" />}
                title="Responsive Design"
                description="Fully functional across all screen sizes with pixel-perfect design adaptation."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">Our Responsive Design Approach:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>Mobile-first development methodology</li>
                      <li>Fluid grid layouts that adapt to any screen size</li>
                      <li>Optimized images and assets for faster loading</li>
                      <li>Touch-friendly interface elements</li>
                      <li>Consistent experience across devices</li>
                    </ul>

                    <p className="mb-4">We test on multiple devices including:</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-muted p-3 rounded-md text-center">
                        <p className="font-medium">Mobile Phones</p>
                        <p className="text-sm text-muted-foreground">320px - 480px</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <p className="font-medium">Tablets</p>
                        <p className="text-sm text-muted-foreground">768px - 1024px</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <p className="font-medium">Laptops</p>
                        <p className="text-sm text-muted-foreground">1024px - 1440px</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <p className="font-medium">Desktops</p>
                        <p className="text-sm text-muted-foreground">1440px+</p>
                      </div>
                    </div>
                  </>
                }
              />

              {/* Feature 3 */}
              <FeatureModal
                icon={<Database className="h-6 w-6 text-primary" />}
                title="Database Integration"
                description="Securely store and manage client requirements, transactions, and chat interactions."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">Database Solutions We Offer:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>SQL databases (MySQL, PostgreSQL)</li>
                      <li>NoSQL databases (MongoDB, Firebase)</li>
                      <li>Real-time database capabilities</li>
                      <li>Secure data encryption and protection</li>
                      <li>Automated backups and recovery options</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">What We Store:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>User profiles and authentication data</li>
                      <li>Project requirements and specifications</li>
                      <li>Transaction records and payment history</li>
                      <li>Communication logs and chat history</li>
                      <li>File metadata and content references</li>
                    </ul>
                  </>
                }
              />

              {/* Feature 4 */}
              <FeatureModal
                icon={<MessageSquare className="h-6 w-6 text-primary" />}
                title="Smart Chatbot System"
                description="Real-time chat with instant admin notifications and responses."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">Chatbot Capabilities:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>24/7 automated responses to common questions</li>
                      <li>Intelligent routing to appropriate team members</li>
                      <li>Real-time notifications for admins</li>
                      <li>Chat history and conversation tracking</li>
                      <li>File sharing and media support</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Admin Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Live chat takeover from automated responses</li>
                      <li>Mobile notifications for new messages</li>
                      <li>Customer information and context display</li>
                      <li>Canned responses for common questions</li>
                      <li>Analytics on response times and satisfaction</li>
                    </ul>
                  </>
                }
              />

              {/* Feature 5 */}
              <FeatureModal
                icon={<Code className="h-6 w-6 text-primary" />}
                title="Modern UI/UX"
                description="Interactive elements at every step with optimized speed and SEO."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">UI/UX Design Principles:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>Clean, intuitive interfaces with clear visual hierarchy</li>
                      <li>Micro-interactions and animations for feedback</li>
                      <li>Consistent design language across all pages</li>
                      <li>Accessibility compliance (WCAG standards)</li>
                      <li>Performance optimization for fast loading</li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Our Design Process:</h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">Research</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">Wireframing</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">Prototyping</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">User Testing</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">Implementation</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="font-medium">Iteration</p>
                      </div>
                    </div>
                  </>
                }
              />

              {/* Feature 6 */}
              <FeatureModal
                icon={<Star className="h-6 w-6 text-primary" />}
                title="Student Discount"
                description="Enjoy up to 25% OFF on all plans with valid student ID."
                modalContent={
                  <>
                    <h3 className="text-lg font-semibold mb-2">Student Discount Program:</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>25% discount on all service plans</li>
                      <li>Valid for current university and college students</li>
                      <li>Simple verification process with student ID</li>
                      <li>Available for both individual and group projects</li>
                      <li>Combinable with seasonal promotions</li>
                    </ul>

                    <div className="bg-primary/10 p-4 rounded-md mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-primary">How to Claim:</h3>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Register an account on ProjectHub</li>
                        <li>Upload a copy of your valid student ID</li>
                        <li>Our team will verify your status within 24 hours</li>
                        <li>Discount will be automatically applied to your account</li>
                      </ol>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      * Discount applies to the base price of all plans. Additional services may be charged at regular
                      rates.
                    </p>
                  </>
                }
              />
            </div>
          </div>
        </section>

        {/* Database Design Section */}
        <section id="database" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Database Design</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Our robust database architecture ensures secure and efficient data management
                </p>
              </div>
            </div>

            <DatabaseDesign />
          </div>
        </section>

        {/* Student Discount Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Student Discount</h2>
                <p className="text-xl">
                  We support learners! Enjoy up to <span className="font-bold text-2xl">25% OFF</span> on all plans with
                  valid student ID.
                </p>
                <Button variant="secondary" size="lg" className="mt-4">
                  Claim Your Discount
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-foreground/20 to-primary-foreground/40 blur"></div>
                  <div className="relative bg-primary rounded-lg p-6 text-center space-y-2">
                    <h3 className="text-2xl font-bold">Student Special</h3>
                    <p className="text-lg">Valid for all university and college students</p>
                    <div className="text-5xl font-bold py-4">25% OFF</div>
                    <p>
                      Use code: <span className="font-mono bg-primary-foreground/20 px-2 py-1 rounded">STUDENT25</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Us</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your go-to platform for custom-built websites and projects on demand
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
              <div className="space-y-4">
                <p className="text-lg">
                  Welcome to ProjectHub, your go-to platform for custom-built websites and projects on demand—designed
                  especially for students, freelancers, and businesses.
                </p>
                <p className="text-lg">
                  We specialize in crafting dynamic and static websites based on your specific requirements. Whether
                  it's for college submissions, startup MVPs, or personal portfolios, we've got you covered.
                </p>
                <p className="text-lg">
                  With student-friendly pricing, high-quality deliverables, and a powerful admin dashboard, we make your
                  project journey smooth and efficient.
                </p>
                <div className="pt-4">
                  <Button size="lg">Contact Us</Button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-background rounded-lg p-6 h-full">
                  <h3 className="text-2xl font-bold mb-4">Why Choose ProjectHub?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Modern UI/UX with interactive elements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Real-time chat & admin response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Optimized for speed and SEO</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Fully mobile responsive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>Figma-designed workflows (optional)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Start Your Project?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get in touch with us today and let's bring your vision to life.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="animate-pulse">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6" />
                <span className="font-bold text-xl">ProjectHub</span>
              </div>
              <p className="text-muted-foreground">
                Custom-built websites and projects on demand for students, freelancers, and businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Dynamic Websites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Static Websites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Custom Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    UI/UX Design
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Email: info@projecthub.com</li>
                <li className="text-muted-foreground">Phone: +1 (123) 456-7890</li>
                <li className="text-muted-foreground">Address: 123 Web Street, Digital City</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 ProjectHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

