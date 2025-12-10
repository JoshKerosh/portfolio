import { connectDB } from '@/lib/mongodb'
import { ProjectModel } from '@/models/Project'
import { SkillModel } from '@/models/Skill'
import Profile from '@/models/Profile'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Github, Linkedin, Mail, Code2 } from 'lucide-react'

function helloWorld(): string {
  return 'Hello World!'
}

async function getData() {
  try {
    await connectDB()
    const [profile, projects, skills] = await Promise.all([
      Profile.findOne().lean(),
      ProjectModel.find({ featured: true }).limit(3).lean().exec(),
      SkillModel.find({ featured: true }).limit(6).lean().exec(),
    ])
    return {
      profile: JSON.parse(JSON.stringify(profile)),
      projects: JSON.parse(JSON.stringify(projects)),
      skills: JSON.parse(JSON.stringify(skills)),
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { profile: null, projects: [], skills: [] }
  }
}

export default async function Home() {
  const { profile, projects, skills } = await getData()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit">
              {profile?.availability?.status === 'available' ? 'Available for work' : 'Open to opportunities'}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I'm
              <span className="text-primary"> {profile?.fullName || 'Joshua Jiménez'}</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
              {profile?.bio || 'Software Developer from Costa Rica. Building modern applications with C#, SQL, and data-driven solutions.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              {profile?.socialMedia?.github && (
                <a
                  href={profile.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {profile?.socialMedia?.linkedin && (
                <a
                  href={profile.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {profile?.contact?.email && (
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
          <div className="relative aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
            <div className="absolute inset-4 bg-background rounded-xl flex items-center justify-center">
              <Code2 className="h-32 w-32 text-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
            Check out some of my recent work
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5" />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/projects/${project.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Core Technologies
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
            Technologies I specialize in
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {skills.map((skill: any) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <CardDescription>{skill.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Proficiency</span>
                    <span className="font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/skills">View All Skills</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/50">
        <Card className="max-w-3xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">Let's Work Together</CardTitle>
            <CardDescription className="text-lg">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
