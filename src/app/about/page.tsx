import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Code2, GraduationCap, Briefcase, Award } from 'lucide-react'
import { connectDB } from '@/lib/mongodb'
import Profile from '@/models/Profile'
import Experience from '@/models/Experience'
import Education from '@/models/Education'
import About from '@/models/About'

async function getData() {
  try {
    await connectDB()
    const [profile, experiences, education, aboutSections] = await Promise.all([
      Profile.findOne().lean(),
      Experience.find().sort({ startDate: -1 }).lean(),
      Education.find().sort({ order: 1 }).lean(),
      About.find({ visible: true }).sort({ order: 1 }).lean(),
    ])
    return {
      profile: JSON.parse(JSON.stringify(profile)),
      experiences: JSON.parse(JSON.stringify(experiences)),
      education: JSON.parse(JSON.stringify(education)),
      aboutSections: JSON.parse(JSON.stringify(aboutSections)),
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { profile: null, experiences: [], education: [], aboutSections: [] }
  }
}

export default async function AboutPage() {
  const { profile, experiences, education, aboutSections } = await getData()

  const values = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, efficient, and well-documented code.',
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description: 'Staying updated with latest technologies and best practices.',
    },
    {
      icon: Briefcase,
      title: 'Professional Excellence',
      description: 'Delivering high-quality solutions that exceed expectations.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Finding creative solutions to complex technical challenges.',
    },
  ]

  const introSection = aboutSections.find((s: any) => s.section === 'intro')
  const backgroundSection = aboutSections.find((s: any) => s.section === 'background')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground">
            {introSection && <p>{introSection.content}</p>}
            {backgroundSection && <p>{backgroundSection.content}</p>}
          </div>
        </div>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((job: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {job.duration}
                      </Badge>
                    </div>
                    <Separator />
                    <p className="text-muted-foreground">{job.description}</p>
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {job.responsibilities.slice(0, 3).map((resp: string, i: number) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {job.achievements.map((achievement: string, i: number) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
          {education.map((edu: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <Badge variant="outline">{edu.graduationYear}</Badge>
                </div>
                <p className="text-muted-foreground">{edu.institution}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{edu.description}</p>
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Highlights:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {edu.achievements.map((achievement: string, i: number) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Skills Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Technical Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {profile?.bio || 'I specialize in backend development with C# and SQL, combined with data analysis expertise.'}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>C# Development</Badge>
              <Badge>SQL & Database Design</Badge>
              <Badge>Data Analysis</Badge>
              <Badge>Backend Development</Badge>
              <Badge>.NET Framework</Badge>
              <Badge>Reporting Systems</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
